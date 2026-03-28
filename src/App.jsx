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
  const scannerMountedRef = useRef(false)
  const yaLeidoRef = useRef(false)
  const readerId = "reader"

  function reiniciarApp() {
    setPantalla("inicio")
    setEquipo(null)
    setEcoActual(0)
    setCodigoIngresado("")
    setRespuestaIngresada("")
    setMensajeError("")
    setFragmentos([])
    yaLeidoRef.current = false
  }

  function validarCodigo(valor, eco) {
    const codigoEsperado = eco.codigoCorrectoPorEquipo[equipo]

    if (valor.trim().toUpperCase() === codigoEsperado) {
      setMensajeError("")
      setCodigoIngresado("")
      setPantalla("pregunta")
    } else {
      setMensajeError("Este no es su eco")
      setCodigoIngresado("")
      yaLeidoRef.current = false
    }
  }

  useEffect(() => {
    let cancelled = false

    async function iniciarScanner() {
      if (pantalla !== "eco") return
      if (scannerMountedRef.current) return

      const eco = ecos[ecoActual]
      const readerElement = document.getElementById(readerId)
      if (!readerElement) return

      try {
        const { Html5Qrcode } = await import("html5-qrcode")
        if (cancelled) return

        const scanner = new Html5Qrcode(readerId)
        scannerRef.current = scanner
        scannerMountedRef.current = true
        yaLeidoRef.current = false

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            aspectRatio: 1
          },
          async (decodedText) => {
            if (yaLeidoRef.current) return
            yaLeidoRef.current = true

            try {
              await scanner.stop()
            } catch (_) {}

            try {
              await scanner.clear()
            } catch (_) {}

            scannerRef.current = null
            scannerMountedRef.current = false

            validarCodigo(decodedText, eco)
          },
          () => {}
        )
      } catch (error) {
        console.error("Error al iniciar scanner:", error)
        setMensajeError("No se pudo abrir la cámara")
        scannerMountedRef.current = false
      }
    }

    iniciarScanner()

    return () => {
      cancelled = true

      async function cleanup() {
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop()
          } catch (_) {}

          try {
            await scannerRef.current.clear()
          } catch (_) {}

          scannerRef.current = null
        }
        scannerMountedRef.current = false
        yaLeidoRef.current = false
      }

      cleanup()
    }
  }, [pantalla, ecoActual, equipo])

  if (pantalla === "inicio") {
    return (
      <div>
        <h1>Ecos de La Máxima</h1>
        <p>Una experiencia para activar los ecos del territorio.</p>
        <button onClick={() => setPantalla("reglas")}>Iniciar</button>
      </div>
    )
  }

  if (pantalla === "reglas") {
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

  if (pantalla === "equipos") {
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

  if (pantalla === "eco") {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div>
        <p><strong>{equipoNombre}</strong></p>
        <p>Eco {ecoActual + 1} de {ecos.length}</p>

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

  if (pantalla === "pregunta") {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    function validarRespuesta() {
      if (
        respuestaIngresada.trim().toUpperCase() ===
        eco.respuestaCorrecta
      ) {
        setMensajeError("")
        setFragmentos([...fragmentos, eco.fragmento])
        setRespuestaIngresada("")
        setPantalla("resultado")
      } else {
        setMensajeError("Respuesta incorrecta")
      }
    }

    return (
      <div>
        <p><strong>{equipoNombre}</strong></p>
        <p>Eco {ecoActual + 1} de {ecos.length}</p>

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

  if (pantalla === "resultado") {
    const eco = ecos[ecoActual]
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    function siguiente() {
      setMensajeError("")

      if (ecoActual + 1 < ecos.length) {
        setEcoActual(ecoActual + 1)
        setPantalla("eco")
      } else {
        setPantalla("final")
      }
    }

    return (
      <div>
        <p><strong>{equipoNombre}</strong></p>
        <p>Eco {ecoActual + 1} de {ecos.length}</p>

        <h2>Eco completado</h2>
        <p>Fragmento obtenido: {eco.fragmento}</p>

        <h3>Fragmentos reunidos:</h3>
        <ul>
          {fragmentos.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <button onClick={siguiente}>Continuar</button>
      </div>
    )
  }

  if (pantalla === "final") {
    const equipoNombre =
      equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div>
        <h2>Final</h2>
        <p><strong>{equipoNombre}</strong></p>

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

  return null
}