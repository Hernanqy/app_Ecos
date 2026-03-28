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
      c: "HERRAMIENTA"
    },
    pregunta: "¿De qué está hecha?",
    respuestaCorrecta: "PIEDRA",
    fragmento: "ORIGEN"
  },
  {
    id: 2,
    titulo: "Eco de la observación",
    consigna: "Observen el entorno y encuentren su validador.",
    codigoCorrectoPorEquipo: {
      a: "SOMBRA",
      b: "LUZ",
      c: "ARBOL"
    },
    pregunta: "¿Qué cambia cuando miran con atención?",
    respuestaCorrecta: "SOMBRA",
    fragmento: "MIRAR"
  },
  {
    id: 3,
    titulo: "Eco de la vida",
    consigna: "Encuentren algo vivo que no se mueva como ustedes.",
    codigoCorrectoPorEquipo: {
      a: "CONDOR",
      b: "PLANTA",
      c: "LAGO"
    },
    pregunta: "¿Qué encontraron?",
    respuestaCorrecta: "VIDA",
    fragmento: "VIVO"
  }
]