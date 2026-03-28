export const equipos = [
  { id: "a", nombre: "Equipo A" },
  { id: "b", nombre: "Equipo B" },
  { id: "c", nombre: "Equipo C" }
]

export const ecos = [
  {
    id: 1,
    titulo: "Eco del tiempo",
    consigna:
      "Encuentren algo que existió antes que ustedes, pero que ya no está en este territorio.",
    codigoCorrectoPorEquipo: {
      a: "PUNTA",
      b: "FOSIL",
      c: "RASTRO"
    },
    pregunta: "¿De qué está hecha la punta de proyectil?",
    respuestaCorrecta: "PIEDRA",
    fragmento: "ORIGEN"
  },
  {
    id: 2,
    titulo: "Eco de la observación",
    consigna:
      "Deténganse. Miren el entorno con atención y encuentren su validador.",
    codigoCorrectoPorEquipo: {
      a: "SOMBRA",
      b: "LUZ",
      c: "HOJA"
    },
    pregunta: "¿Qué aparece en el suelo cuando la luz se interrumpe?",
    respuestaCorrecta: "SOMBRA",
    fragmento: "MIRAR"
  },
  {
    id: 3,
    titulo: "Eco de la vida",
    consigna:
      "Encuentren algo vivo que no se mueva como ustedes.",
    codigoCorrectoPorEquipo: {
      a: "CONDOR",
      b: "PLANTA",
      c: "FLOR"
    },
    pregunta:
      "¿Qué palabra nombra todo lo que está vivo en este recorrido?",
    respuestaCorrecta: "VIDA",
    fragmento: "VIVO"
  }
]