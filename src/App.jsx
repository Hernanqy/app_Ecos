import { useEffect, useRef, useState } from "react"
import { ecos, equipos } from "./data"

function BarraProgreso({ ecoActual, total }) {
  return (
    <div className="barra-progreso">
      {Array.from({ length: total }).map((_, index) => {
        let clase = "paso"
        if (index < ecoActual) clase += " completado"
        if (index === ecoActual) clase += " actual"

        return (
          <div key={index} className={clase}>
            <span>{index + 1}</span>
          </div>
        )
      })}
    </div>
  )
}

function ColeccionFragmentos({ fragmentos }) {
  return (
    <div className="fragmentos-grid">
      {ecos.map((eco) => {
        const obtenido = fragmentos.find((f) => f.nombre === eco.fragmento)

        return (
          <div
            key={eco.id}
            className={`fragmento-icono ${obtenido ? "obtenido" : "faltante"}`}
            title={obtenido ? eco.fragmento : "Fragmento por descubrir"}
          >
            <span>{eco.fragmentoIcono}</span>
          </div>
        )
      })}
    </div>
  )
}

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

  function renderInicio() {
    return (
      <div className="pantalla pantalla-centrada pantalla-portada">
        <div className="luz-magica"></div>

        <h1 className="titulo-principal">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <div className="mascota-badge">🌿</div>
          <div className="icono-hero">🧭</div>
          <p className="texto-destacado">
            Una experiencia para activar los ecos del territorio.
          </p>
          <p className="texto-suave">
            Recorré, observá y descubrí los fragmentos del lugar.
          </p>
          <button className="boton-principal" onClick={() => setPantalla("reglas")}>
            Comenzar recorrido
          </button>
        </div>
      </div>
    )
  }

  function renderReglas() {
    return (
      <div className="pantalla pantalla-centrada pantalla-portada">
        <div className="luz-magica"></div>

        <h1 className="titulo-principal">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <div className="mascota-badge">🍃</div>
          <div className="icono-hero">🧭</div>
          <h2>Antes de empezar</h2>
          <p>Esto no es una carrera.</p>
          <p>No hace falta correr.</p>
          <p>No toquen nada que no sea necesario.</p>
          <p>Todo lo que buscan está a la vista.</p>
          <button onClick={() => setPantalla("equipos")}>Entendido</button>
        </div>
      </div>
    )
  }

  function renderEquipos() {
    return (
      <div className="pantalla pantalla-centrada pantalla-portada">
        <div className="luz-magica"></div>

        <h1 className="titulo-principal">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <div className="mascota-badge">👣</div>
          <div className="icono-hero">👥</div>
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

          <button className="boton-secundario" onClick={reiniciarApp}>
            Volver
          </button>
        </div>
      </div>
    )
  }

  function renderEco() {
    const eco = ecos[ecoActual]
    const equipoNombre = equipos.find((e) => e.id === equipo)?.nombre || ""
    const validador = obtenerValidadorActual()
    const readerId = `reader-${ecoActual}`

    return (
      <div className="pantalla">
        <h1 className="titulo-principal titulo-secundario">Ecos de La Máxima</h1>

        <div className="panel">
          <BarraProgreso ecoActual={ecoActual} total={ecos.length} />

          <p className="meta"><strong>{equipoNombre}</strong></p>
          <p className="meta"><strong>Lugar:</strong> {eco.lugar}</p>

          <div className="icono-hero">{eco.icono}</div>
          <h2>{eco.titulo}</h2>
          <p>{eco.consigna}</p>

          <div className="caja-destacada">
            <p className="texto-destacado">
              <strong>Busquen:</strong> {validador.objeto}
            </p>
          </div>

          <h3>Escanear QR</h3>
          <div
            id={readerId}
            style={{
              width: "100%",
              minHeight: "260px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#d8dccf"
            }}
          />

          <p className="texto-suave">o ingresar código manualmente</p>

          <input
            value={codigoIngresado}
            onChange={(e) => setCodigoIngresado(e.target.value)}
            placeholder="Código"
          />

          <button onClick={() => validarCodigo(codigoIngresado)}>
            Validar eco
          </button>

          {mensajeError && <p className="error-texto">{mensajeError}</p>}
        </div>
      </div>
    )
  }

  function renderCodigoCorrecto() {
    const eco = ecos[ecoActual]
    const equipoNombre = equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div className="pantalla pantalla-centrada">
        <h1 className="titulo-principal titulo-secundario">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <BarraProgreso ecoActual={ecoActual} total={ecos.length} />

          <div className="mascota-badge">✨</div>
          <div className="icono-hero">{eco.icono}</div>
          <p className="meta"><strong>{equipoNombre}</strong></p>

          <h2>¡Eco encontrado!</h2>
          <p>Validación correcta.</p>
          <p>Desbloquearon la siguiente pista.</p>

          <button onClick={() => setPantalla("pregunta")}>Continuar</button>
        </div>
      </div>
    )
  }

  function renderPregunta() {
    const eco = ecos[ecoActual]
    const equipoNombre = equipos.find((e) => e.id === equipo)?.nombre || ""
    const validador = obtenerValidadorActual()

    function validarRespuesta() {
      if (
        respuestaIngresada.trim().toUpperCase() ===
        validador.respuestaCorrecta
      ) {
        const nuevosFragmentos = [
          ...fragmentos,
          {
            nombre: eco.fragmento,
            icono: eco.fragmentoIcono
          }
        ]
        setFragmentos(nuevosFragmentos)
        setRespuestaIngresada("")
        setMensajeError("")
        setPantalla("resultado")
      } else {
        setMensajeError("Respuesta incorrecta")
      }
    }

    return (
      <div className="pantalla pantalla-centrada">
        <h1 className="titulo-principal titulo-secundario">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <BarraProgreso ecoActual={ecoActual} total={ecos.length} />

          <div className="mascota-badge">🔎</div>
          <div className="icono-hero">{eco.icono}</div>
          <p className="meta"><strong>{equipoNombre}</strong></p>
          <p className="meta"><strong>Lugar:</strong> {eco.lugar}</p>

          <h2>{eco.titulo}</h2>
          <p>{validador.pregunta}</p>

          <input
            value={respuestaIngresada}
            onChange={(e) => setRespuestaIngresada(e.target.value)}
            placeholder="Respuesta"
          />

          <button onClick={validarRespuesta}>Responder</button>

          {mensajeError && <p className="error-texto">{mensajeError}</p>}
        </div>
      </div>
    )
  }

  function renderResultado() {
    const eco = ecos[ecoActual]
    const equipoNombre = equipos.find((e) => e.id === equipo)?.nombre || ""

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
      <div className="pantalla pantalla-centrada">
        <h1 className="titulo-principal titulo-secundario">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <BarraProgreso ecoActual={ecoActual + 1} total={ecos.length} />

          <div className="mascota-badge">🍃</div>
          <div className="icono-hero">{eco.icono}</div>
          <p className="meta"><strong>{equipoNombre}</strong></p>

          <h2>Eco completado</h2>
          <p className="texto-destacado">
            Fragmento obtenido: <strong>{eco.fragmento}</strong>
          </p>

          <h3>Fragmentos reunidos</h3>
          <ColeccionFragmentos fragmentos={fragmentos} />

          <button onClick={siguienteEco}>Continuar</button>
        </div>
      </div>
    )
  }

  function renderFinal() {
    const equipoNombre = equipos.find((e) => e.id === equipo)?.nombre || ""

    return (
      <div className="pantalla pantalla-centrada pantalla-portada">
        <div className="luz-magica"></div>

        <h1 className="titulo-principal">Ecos de La Máxima</h1>

        <div className="panel panel-destacado panel-vivo">
          <BarraProgreso ecoActual={ecos.length} total={ecos.length} />

          <div className="mascota-badge">🏞️</div>
          <div className="icono-hero">🌟</div>
          <h2>Recorrido completado</h2>
          <p className="meta"><strong>{equipoNombre}</strong></p>

          <h3>Fragmentos reunidos</h3>
          <ColeccionFragmentos fragmentos={fragmentos} />

          <button onClick={reiniciarApp}>Volver al inicio</button>
        </div>
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