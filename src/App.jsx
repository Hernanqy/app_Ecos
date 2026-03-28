import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { ecos, equipos } from "./data"

export default function App() {
  const [pantalla, setPantalla] = useState("inicio")
  const [equipo, setEquipo] = useState(null)
  const [ecoActual, setEcoActual] = useState(0)

  const [codigoIngresado, setCodigoIngresado] = useState("")
  const [mensajeError, setMensajeError] = useState("")

  const [respuestaIngresada, setRespuestaIngresada] = useState("")
  const [fragmentos, setFragmentos] = useState([])

  const qrRef = useRef(null)

  function reiniciarApp() {
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
      setPantalla("pregunta")
    } else {
      setMensajeError("Este no es su eco")
    }
  }

  // 🔍 ACTIVAR CÁMARA
  useEffect(() => {
    if (pantalla === "eco" && qrRef.current) {
      const html5QrCode = new Html5Qrcode("reader")

      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250
          },
          (decodedText) => {
            const eco = ecos[ecoActual]
            validarCodigo(decodedText, eco)
            html5QrCode.stop()
          },
          () => {}
        )
        .catch(() => {})
    }
  }, [pantalla, ecoActual])

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
        <div id="reader" ref={qrRef} style={{ width: "100%" }} />

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

    function validarRespuesta() {
      if (
        respuestaIngresada.trim().toUpperCase() ===
        eco.respuestaCorrecta
      ) {
        setFragmentos([...fragmentos, eco.fragmento])
        setRespuestaIngresada("")
        setPantalla("resultado")
      } else {
        setMensajeError("Respuesta incorrecta")
      }
    }

    return (
      <div>
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

    function siguiente() {
      if (ecoActual + 1 < ecos.length) {
        setEcoActual(ecoActual + 1)
        setPantalla("eco")
      } else {
        setPantalla("final")
      }
    }

    return (
      <div>
        <h2>Eco completado</h2>
        <p>{eco.fragmento}</p>

        <button onClick={siguiente}>Continuar</button>
      </div>
    )
  }

  if (pantalla === "final") {
    return (
      <div>
        <h2>Final</h2>
        {fragmentos.map((f, i) => (
          <p key={i}>{f}</p>
        ))}
        <button onClick={reiniciarApp}>Reiniciar</button>
      </div>
    )
  }
}