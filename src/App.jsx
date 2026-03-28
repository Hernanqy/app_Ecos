import { useEffect, useRef, useState } from "react"
import { ecos, equipos } from "./data"
import GameProgressBar from "./components/GameProgressBar"

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

  const ecosTotales = ecos.length

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

  function obtenerValidadorActual() {
    const eco = ecos[ecoActual]
    return eco.validadores[equipo]
  }

  function validarCodigo(valor) {
    const validador = obtenerValidadorActual()

    if (valor.trim().toUpperCase() === validador.codigo) {
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
            validarCodigo(decodedText)
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

  function Barra() {
    return (
      <GameProgressBar
        current={ecoActual}
        total={ecosTotales}
        label="Resonancia de La Máxima"
      />
    )
  }

  function renderInicio() {
    return (
      <div className="pantalla pantalla-centrada pantalla-portada">
        <h1 className="titulo-principal">Ecos de La Máxima</h1>
        <button onClick={() => setPantalla("reglas")}>
          Comenzar recorrido
        </button>
      </div>
    )
  }

  function renderReglas() {
    return (
      <div className="pantalla pantalla-centrada">
        <h1>Ecos de La Máxima</h1>
        <button onClick={() => setPantalla("equipos")}>
          Entendido
        </button>
      </div>
    )
  }

  function renderEquipos() {
    return (
      <div className="pantalla pantalla-centrada">
        <h2>Elegí tu equipo</h2>

        {equipos.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setEquipo(item.id)
              setPantalla("eco")
            }}
          >
            {item.nombre}
          </button>
        ))}
      </div>
    )
  }

  function renderEco() {
    const eco = ecos[ecoActual]
    const validador = obtenerValidadorActual()
    const readerId = `reader-${ecoActual}`

    return (
      <div className="pantalla">
        <Barra />

        <h2>{eco.titulo}</h2>
        <p>{eco.consigna}</p>

        <div id={readerId} style={{ height: 250, background: "#ccc" }} />

        <input
          value={codigoIngresado}
          onChange={(e) => setCodigoIngresado(e.target.value)}
        />

        <button onClick={() => validarCodigo(codigoIngresado)}>
          Validar
        </button>

        {mensajeError && <p>{mensajeError}</p>}
      </div>
    )
  }

  function renderCodigoCorrecto() {
    return (
      <div className="pantalla pantalla-centrada">
        <Barra />

        <h2>¡Eco encontrado!</h2>

        <button onClick={() => setPantalla("pregunta")}>
          Continuar
        </button>
      </div>
    )
  }

  function renderPregunta() {
    const eco = ecos[ecoActual]
    const validador = obtenerValidadorActual()

    function validarRespuesta() {
      if (
        respuestaIngresada.trim().toUpperCase() ===
        validador.respuestaCorrecta
      ) {
        setFragmentos([...fragmentos, eco.fragmento])
        setPantalla("resultado")
      } else {
        setMensajeError("Respuesta incorrecta")
      }
    }

    return (
      <div className="pantalla pantalla-centrada">
        <Barra />

        <h2>{eco.titulo}</h2>

        <input
          value={respuestaIngresada}
          onChange={(e) => setRespuestaIngresada(e.target.value)}
        />

        <button onClick={validarRespuesta}>
          Responder
        </button>

        {mensajeError && <p>{mensajeError}</p>}
      </div>
    )
  }

  function renderResultado() {
    function siguienteEco() {
      if (ecoActual + 1 < ecos.length) {
        setEcoActual((prev) => prev + 1)
        setPantalla("eco")
      } else {
        setPantalla("final")
      }
    }

    return (
      <div className="pantalla pantalla-centrada">
        <Barra />

        <h2>Eco completado</h2>

        <button onClick={siguienteEco}>
          Continuar
        </button>
      </div>
    )
  }

  function renderFinal() {
    return (
      <div className="pantalla pantalla-centrada">
        <h2>Recorrido completado</h2>

        <button onClick={reiniciarApp}>
          Volver al inicio
        </button>
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

  return <div>Error</div>
}