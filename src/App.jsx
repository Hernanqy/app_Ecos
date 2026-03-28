import { useEffect, useRef, useState } from "react"
import { ecos, equipos } from "./data"

export default function App() {
  const [pantalla, setPantalla] = useState("inicio")
  const [equipo, setEquipo] = useState(null)
  const [ecoActual, setEcoActual] = useState(0)

  const [codigoIngresado, setCodigoIngresado] = useState("")
  const [mensajeError, setMensajeError] = useState("")
  const [respuestaIngresada, setRespuestaIngresada] = useState("")
  const [fragmentos, setFragmentos] = useState([])

  const scannerRef = useRef(null)
  const scannerIniciadoRef = useRef(false)
  const qrLeidoRef = useRef(false)

  async function detenerScanner() {
    if (!scannerRef.current) {
      scannerIniciadoRef.current = false
      qrLeidoRef.current = false
      return
    }

    try {
      await scannerRef.current.stop()
    } catch (_) {}

    try {
      await scannerRef.current.clear()
    } catch (_) {}

    scannerRef.current = null
    scannerIniciadoRef.current = false
    qrLeidoRef.current = false
  }

  function reiniciarApp() {
    detenerScanner()
    setPantalla("inicio")
    setEquipo(null)
    setEcoActual(0)
    setCodigoIngresado("")
    setRespuestaIngresada("")
    setMensajeError("")
    setFragmentos([])
  }

  function validarCodigo(valor, eco) {
    const codigoEsperado = eco.codigoCorrectoPorEquipo[equipo]

    if (valor.trim().toUpperCase() === codigoEsperado) {
      setMensajeError("")
      setCodigoIngresado("")
      setPantalla("codigo-correcto")
    } else {
      setMensajeError("Este no es su eco")
      setCodigoIngresado("")
      qrLeidoRef.current = false
    }
  }

  useEffect(() => {
    let desmontado = false

    async function iniciarScanner() {
      if (pantalla !== "eco") {
        await detenerScanner()
        return
      }

      if (scannerIniciadoRef.current) return

      const readerId = `reader-${ecoActual}`
      const readerElement = document.getElementById(readerId)
      if (!readerElement) return

      try {
        const { Html5Qrcode } = await import("html5-qrcode")
        if (desmontado) return

        const eco = ecos[ecoActual]
        const scanner = new Html5Qrcode(readerId)

        scannerRef.current = scanner
        scannerIniciadoRef.current = true
        qrLeidoRef.current = false

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            aspectRatio: 1
          },
          async (decodedText) => {
            if (qrLeidoRef.current) return
            qrLeidoRef.current = true

            await detenerScanner()
            validarCodigo(decodedText, eco)
          },
          () => {}
        )
      } catch (error) {
        console.error("Error al iniciar scanner:", error)
        setMensajeError("No se pudo abrir la cámara")
        scannerIniciadoRef.current = false
      }
    }

    iniciarScanner()

    return () => {
      desmontado = true
      if (pantalla === "eco") {
        detenerScanner()
      }
    }
  }, [pantalla, ecoActual, equipo])

  function renderInicio() {
    return (
      <div>
        <h1>Ecos de La Máxima</h1>
        <p>Una experiencia para activar los ecos del territorio.</p>
        <button onClick={() => setPantalla("reglas")}>Iniciar</button>
      </div>
    )
  }

  function renderReglas() {
    return (
      <div>
        <h2>Antes de empezar</h2>
        <p>Esto no es una carrera.</p>
        <p>No hace falta correr.</p>
        <p>No toquen nada que no sea necesario.</p>
        <p>Todo lo que buscan está a la vista.</p>
        <button onClick={() => setPantalla("equipos")}>Entendido</button>
      </div>
    )
  }

  function renderEquipos() {
    return (
      <div>
        <h2>Elegí tu equipo</h2>

        {equipos.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setEquipo(item.id)
              setMensajeError("")
              setPantalla("eco")
            }}
          >
            {item.nombre}
          </button>
        ))}

        <button onClick={reiniciarApp}>Volver</button>
      </div>
    )
  }

  function renderEco() {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""
    const readerId = `reader-${ecoActual}`

    return (
      <div>
        <p>
          <strong>{equipoNombre}</strong>
        </p>
        <p>
          Eco {ecoActual + 1} de {ecos.length}
        </p>

        <h2>{eco.titulo}</h2>
        <p>{eco.consigna}</p>

        <h3>Escanear QR</h3>
        <div
          id={readerId}
          style={{
            width: "100%",
            minHeight: "260px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#ddd"
          }}
        />

        <p>o ingresar código</p>

        <input
          value={codigoIngresado}
          onChange={(e) => setCodigoIngresado(e.target.value)}
          placeholder="Código"
        />

        <button onClick={() => validarCodigo(codigoIngresado, eco)}>
          Validar código
        </button>

        {mensajeError && <p>{mensajeError}</p>}
      </div>
    )
  }

  function renderCodigoCorrecto() {
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div>
        <p>
          <strong>{equipoNombre}</strong>
        </p>
        <p>
          Eco {ecoActual + 1} de {ecos.length}
        </p>

        <h2>¡Eco encontrado!</h2>
        <p>Validación correcta.</p>
        <p>Desbloquearon la siguiente pista.</p>

        <button onClick={() => setPantalla("pregunta")}>Continuar</button>
      </div>
    )
  }

  function renderPregunta() {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    function validarRespuesta() {
      if (respuestaIngresada.trim().toUpperCase() === eco.respuestaCorrecta) {
        const nuevosFragmentos = [...fragmentos, eco.fragmento]
        setFragmentos(nuevosFragmentos)
        setRespuestaIngresada("")
        setMensajeError("")
        setPantalla("resultado")
      } else {
        setMensajeError("Respuesta incorrecta")
      }
    }

    return (
      <div>
        <p>
          <strong>{equipoNombre}</strong>
        </p>
        <p>
          Eco {ecoActual + 1} de {ecos.length}
        </p>

        <h2>{eco.titulo}</h2>
        <p>{eco.pregunta}</p>

        <input
          value={respuestaIngresada}
          onChange={(e) => setRespuestaIngresada(e.target.value)}
          placeholder="Respuesta"
        />

        <button onClick={validarRespuesta}>Responder</button>

        {mensajeError && <p>{mensajeError}</p>}
      </div>
    )
  }

  function renderResultado() {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    function siguienteEco() {
      setMensajeError("")
      setCodigoIngresado("")
      setRespuestaIngresada("")

      if (ecoActual + 1 < ecos.length) {
        setEcoActual((prev) => prev + 1)
        setPantalla("eco")
      } else {
        setPantalla("final")
      }
    }

    return (
      <div>
        <p>
          <strong>{equipoNombre}</strong>
        </p>
        <p>
          Eco {ecoActual + 1} de {ecos.length}
        </p>

        <h2>Eco completado</h2>
        <p>Fragmento obtenido: {eco.fragmento}</p>

        <h3>Fragmentos reunidos:</h3>
        <ul>
          {fragmentos.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <button onClick={siguienteEco}>Continuar</button>
      </div>
    )
  }

  function renderFinal() {
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div>
        <h2>Final</h2>
        <p>
          <strong>{equipoNombre}</strong>
        </p>

        <h3>Fragmentos obtenidos:</h3>
        <ul>
          {fragmentos.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <button onClick={reiniciarApp}>Reiniciar</button>
      </div>
    )
  }

  if (pantalla === "inicio") return renderInicio()
  if (pantalla === "reglas") return renderReglas()
  if (pantalla === "equipos") return renderEquipos()
  if (pantalla === "eco") return renderEco()
  if (pantalla === "codigo-correcto") return renderCodigoCorrecto()
  if (pantalla === "pregunta") return renderPregunta()
  if (pantalla === "resultado") return renderResultado()
  if (pantalla === "final") return renderFinal()

  return <div>Error de navegación</div>
}