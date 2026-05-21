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
        codigo: "BIFACE",
        objeto: "Herramienta de piedra",
        pregunta: "¿Como se llama la piedra que se uso?",
        respuestaCorrecta: "cuarsita"
      },
      b: {
        codigo: "TOXODON",
        objeto: "Fósil",
        pregunta: "¿Como se llama este animal?",
        respuestaCorrecta: "toxodon"
      },
      c: {
        codigo: "GLIPTODONTE",
        objeto: "Animal prehistorico con caparazon",
        pregunta: "¿Que nos da la informacion sobre ellos hoy?",
        respuestaCorrecta: "fosiles"
      }
    }
  },
  {
    id: 2,
    icono: "👁️",
    lugar: "Lago",
    titulo: "Eco de la observación",
    fragmento: "RAICES",
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
    lugar: "Condorera",
    titulo: "Eco de la vida",
    fragmento: "NATURALEZA",
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
  },
{
  id: 4,
  icono: "🏛️",
  lugar: "Casona",
  titulo: "Eco de la memoria",
  fragmento: "MEMORIA",
  fragmentoIcono: "📜",
  consigna:
    "Este lugar guarda historias. Busquen algo que haya estado aquí antes que ustedes y que aún permanezca.",
  validadores: {
    a: {
      codigo: "PUERTA",
      objeto: "Puerta antigua",
      pregunta: "¿Qué elemento permite entrar y salir de un lugar?",
      respuestaCorrecta: "PUERTA"
    },
    b: {
      codigo: "VENTANA",
      objeto: "Ventana",
      pregunta: "¿Qué elemento permite ver hacia afuera?",
      respuestaCorrecta: "VENTANA"
    },
    c: {
      codigo: "HISTORIA",
      objeto: "Relato del lugar",
      pregunta: "¿Qué se construye con el paso del tiempo?",
      respuestaCorrecta: "HISTORIA"
    }
  }
}

]