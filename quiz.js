// Lista de preguntas (con opciones y la respuesta correcta)
let preguntas;
  

fetch('./preguntas_cultura_general.json')
  .then(response => response.json())
  .then(preguntasJson => { 
    preguntas = preguntasJson;
  });

let preguntaActual = 0;  // número de pregunta actual
let puntuacion = 0;    // número de respuestas correctas
let mostrarBotanEmpezar = true;


// Mostrar la pregunta actual
function mostrarPregunta() {
  if (mostrarBotanEmpezar) {
    document.getElementById("botonEmpezar").hidden = true;
    mostrarBotanEmpezar = false;
  }
  const p = preguntas[preguntaActual];
  document.getElementById("pregunta").innerText = p.pregunta;
  //obtenemos el elemento
  const elementoOpciones = document.getElementById("opciones");
  //vaciamos el elemento
  elementoOpciones.innerHTML = "";
  //p.opciones.lenght--> número de opciones que tenemos
  for (let i = 0; i < p.opciones.length; i = i + 1) {

    //Creamos un elemnto de tipo botón
    const btn = document.createElement("button");

    //Asignamos el texto de una de las opciones a el botón de la opción
    btn.textContent = p.opciones[i];
    btn.onclick = function() {
      comprobarRespuesta(i);
    }
    elementoOpciones.appendChild(btn);
  }
}

// Comprobar si la respuesta es correcta
function comprobarRespuesta(respuestaUsuario) {
  const correcta = preguntas[preguntaActual].respuestaCorrecta;

  if (respuestaUsuario == correcta) {
    const audio = new Audio('assets/aplausos.mp3');
    audio.play();
    alert("¡Correcto!");
    puntuacion += 1;
  } else {
    const audio = new Audio('assets/fallo.mp3');
    audio.play();
    alert("No es correcto");
  }
  siguientePregunta();
}

// Pasar a la siguiente pregunta o mostrar la puntuación
function siguientePregunta() {
  preguntaActual = preguntaActual + 1;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    document.getElementById("pregunta").textContent = "Juego Terminado";
    document.getElementById("opciones").innerHTML = "";
    document.getElementById("puntuacion").textContent = "Tu puntuación ha sido: " + puntuacion;
  }
}

// Empezar el juego mostrando la primera pregunta




