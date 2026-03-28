export const equipos = [
  { id: "a", nombre: "Equipo A" },
  { id: "b", nombre: "Equipo B" },
  { id: "c", nombre: "Equipo C" }
]

export const ecos = [
  {
    id: 1,
    lugar: "Museo",
    titulo: "Eco del tiempo",
    consigna:
      "Encuentren algo que existió antes que ustedes, pero que ya no está en este territorio.",
    validadores: {
      a: {
        codigo: "PUNTA",
        objeto: "Punta de proyectil",
        pregunta: "¿De qué está hecha la punta de proyectil?",
        respuestaCorrecta: "PIEDRA"
      },
      b: {
        codigo: "FOSIL",
        objeto: "Fósil",
        pregunta: "¿Qué evidencia conserva un fósil?",
        respuestaCorrecta: "VIDA"
      },
      c: {
        codigo: "RASTRO",
        objeto: "Rastro de megafauna",
        pregunta: "¿Qué idea deja un rastro del pasado?",
        respuestaCorrecta: "HUELLA"
      }
    },
    fragmento: "ORIGEN"
  },
  {
    id: 2,
    lugar: "Exterior del museo",
    titulo: "Eco de la observación",
    consigna:
      "Deténganse. Miren el entorno con atención y encuentren su validador.",
    validadores: {
      a: {
        codigo: "SOMBRA",
        objeto: "Sombra",
        pregunta: "¿Qué aparece en el suelo cuando la luz se interrumpe?",
        respuestaCorrecta: "SOMBRA"
      },
      b: {
        codigo: "LUZ",
        objeto: "Haz de luz",
        pregunta: "¿Qué hace visible una sombra?",
        respuestaCorrecta: "LUZ"
      },
      c: {
        codigo: "HOJA",
        objeto: "Hoja",
        pregunta: "¿Qué elemento natural cambia con el viento y la luz?",
        respuestaCorrecta: "HOJA"
      }
    },
    fragmento: "MIRAR"
  },
  {
    id: 3,
    lugar: "Bioparque",
    titulo: "Eco de la vida",
    consigna:
      "Encuentren algo vivo que no se mueva como ustedes.",
    validadores: {
      a: {
        codigo: "CONDOR",
        objeto: "Cóndor",
        pregunta: "¿Qué palabra nombra todo lo que está vivo en este recorrido?",
        respuestaCorrecta: "VIDA"
      },
      b: {
        codigo: "PLANTA",
        objeto: "Planta",
        pregunta: "¿Qué necesita una planta para crecer?",
        respuestaCorrecta: "AGUA"
      },
      c: {
        codigo: "FLOR",
        objeto: "Flor",
        pregunta: "¿Qué parte visible ayuda a reconocer una flor?",
        respuestaCorrecta: "COLOR"
      }
    },
    fragmento: "VIVO"
  }
]