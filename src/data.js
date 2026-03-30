export const equipos = [
  { id: "a", nombre: "Equipo A" },
  { id: "b", nombre: "Equipo B" },
  { id: "c", nombre: "Equipo C" }
]

export const ecos = [
  {
    id: 1,
    icono: "⏳",
    lugar: "Museo - Sala primeros habitantes",
    titulo: "Eco del tiempo",
    fragmento: "ORIGEN",
    fragmentoIcono: "🪨",
    consigna:
      "Encuentren algo que fue creado por personas que vivieron en este territorio mucho antes que ustedes.",
    validadores: {
      a: {
        codigo: "biface",
        objeto: "Punta de proyectil",
        pregunta: "¿Como se llama la piedra que se uso?",
        respuestaCorrecta: "cuarsita"
      },
      b: {
        codigo: "FOSIL",
        objeto: "Fósil",
        pregunta: "¿Qué nos permite conocer un fósil?",
        respuestaCorrecta: "PASADO"
      },
      c: {
        codigo: "HERRAMIENTA",
        objeto: "Herramienta antigua",
        pregunta: "¿Para qué fue creada esta herramienta?",
        respuestaCorrecta: "CAZAR"
      }
    }
  },
  {
    id: 2,
    icono: "👁️",
    lugar: "Salida del museo / exterior",
    titulo: "Eco de la observación",
    fragmento: "MIRAR",
    fragmentoIcono: "👁️",
    consigna:
      "Deténganse. Durante unos segundos no hablen. Miren el entorno con atención.",
    validadores: {
      a: {
        codigo: "SOMBRA",
        objeto: "Sombra en el suelo",
        pregunta: "¿Qué aparece cuando la luz es interrumpida?",
        respuestaCorrecta: "SOMBRA"
      },
      b: {
        codigo: "LUZ",
        objeto: "Luz del sol",
        pregunta: "¿Qué hace visibles las formas en el entorno?",
        respuestaCorrecta: "LUZ"
      },
      c: {
        codigo: "VIENTO",
        objeto: "Movimiento del entorno",
        pregunta: "¿Qué no se ve pero se siente en el entorno?",
        respuestaCorrecta: "VIENTO"
      }
    }
  },
  {
    id: 3,
    icono: "🐾",
    lugar: "Bioparque",
    titulo: "Eco de la vida",
    fragmento: "VIVO",
    fragmentoIcono: "🌿",
    consigna:
      "Encuentren algo vivo que no se mueva como ustedes, pero que forma parte de este lugar.",
    validadores: {
      a: {
        codigo: "CONDOR",
        objeto: "Cóndor",
        pregunta: "¿Qué palabra engloba a todos los seres vivos?",
        respuestaCorrecta: "VIDA"
      },
      b: {
        codigo: "PLANTA",
        objeto: "Planta",
        pregunta: "¿Qué necesita una planta para vivir?",
        respuestaCorrecta: "AGUA"
      },
      c: {
        codigo: "ARBOL",
        objeto: "Árbol",
        pregunta: "¿Qué parte del árbol crece hacia el suelo?",
        respuestaCorrecta: "RAIZ"
      }
    }
  }
]