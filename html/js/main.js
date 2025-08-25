//Arreglo de preguntas

const preguntas = [
    {
        texto: "¿Cuál es la raíz cuadrada de 25?",
        opciones: [
            "5",
            "3",
            "25 no tiene raíz cuadrada",
            "2"
        ],
        respuesta: 0
    },

    {
        texto: "¿Qué significa HTML?",
        opciones: [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Management Language"
        ],
        respuesta: 1
    },

    {
        texto: "¿Cuál es la etiqueta correcta para insertar una hoja de estilos CSS en HTML?",
        opciones: [
            "&lt;css&gt;",
            "&lt;link rel='stylesheet'&gt;",
            "&lt;style src='style.css'&gt;",
            "&lt;script href='style.css'&gt;"
        ],
        respuesta: 1
    },

    {
        texto: "¿Qué propiedad en CSS se utiliza para cambiar el color del texto?",
        opciones: [
            "background-color",
            "color",
            "font-color",
            "text-color"
        ],
        respuesta: 1
    },

    {
        texto: "¿Cuál de las siguientes NO es una clase de Bootstrap?",
        opciones: [
            "container",
            "row",
            "col",
            "block"
        ],
        respuesta: 3
    },

    {
        texto: "¿Qué etiqueta se usa para insertar JavaScript en HTML?",
        opciones: [
            "&lt;js&gt;",
            "&lt;javascript&gt;",
            "&lt;script&gt;",
            "&lt;code&gt;"
        ],
        respuesta: 2
    },

    {
        texto: "¿Qué significa CSS?",
        opciones: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        respuesta: 2
    },

    {
        texto: "¿Qué clase de Bootstrap se usa para un botón primario?",
        opciones: [
            "btn-main",
            "btn btn-primary",
            "button-primary",
            "btn-blue"
        ],
        respuesta: 1
    },

    {
        texto: "¿Qué palabra reservada en Java se utiliza para heredar una clase?",
        opciones: [
            "extends",
            "inherits",
            "super",
            "this"
        ],
        respuesta: 0
    },

    {
        texto: "¿Qué método en JavaScript convierte un JSON en un objeto?",
        opciones: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.object()",
            "JSON.toObject()"
        ],
        respuesta: 0
    },

    {
        texto: "¿Cuál es el atajo de Bootstrap para un contenedor fluido?",
        opciones: [
            "container-fluid",
            "container-wide",
            "container-100",
            "container-expand"
        ],
        respuesta: 0
    }
];

// Variables de control

let indice = 0;

// Recuperar respuestas guardadas en localStorage
let respuestasUsuario = JSON.parse(localStorage.getItem("respuestasUsuario")) || new Array(preguntas.length).fill(null);

const preguntaC = document.getElementById("pregunta");
const opcionesC = document.getElementById("opciones");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

// Función para mostrar la pregunta actual

function mostrarPregunta() {
    if (indice < preguntas.length) {
        const pregunta = preguntas[indice];
        preguntaC.innerHTML = `<h5>${indice + 1} de ${preguntas.length}: ${pregunta.texto}</h5>`;
        opcionesC.innerHTML = "";
        pregunta.opciones.forEach((opcion, i) => {
            opcionesC.innerHTML += `
        <div class="form-check">
        <input class="form-check-input" type="radio" name="respuesta" value="${i}" id="opcion${i}" ${respuestasUsuario[indice] === i ? "checked" : ""}>
        <label class="form-check-label" for="opcion${i}">${opcion}</label>
        </div>
        `;
        });
    } else {
        mostrarResultados();
    }

    btnAnterior.disabled = (indice === 0);
    btnSiguiente.textContent = (indice === preguntas.length - 1) ? "Finalizar" : "Siguiente";
}

//Guardar respuesta seleccionada

function guardarRespuesta() {
    const seleccion = document.querySelector('input[name="respuesta"]:checked');
    if (seleccion) {
        respuestasUsuario[indice] = parseInt(seleccion.value);
        localStorage.setItem("respuestasUsuario", JSON.stringify(respuestasUsuario));
    }
}

// Evento para el botón "Anterior"

btnAnterior.addEventListener("click", () => {
    if (indice > 0) {
        guardarRespuesta();
        indice--;
        mostrarPregunta();
    }
});

// Evento para el botón "Siguiente"

btnSiguiente.addEventListener("click", () => {
    guardarRespuesta();
    if (indice < preguntas.length - 1) {
        indice++;
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
});

// // Finalizar Cuestionario

// function finalizarCuestionario() {
//     let aciertos = 0;
//     preguntas.forEach((p, i) => {
//         if (respuestasUsuario[i] === p.respuesta) {
//             aciertos++;
//         }
//     });

//     document.body.innerHTML =
//         `<div class= "container text-center py-5">
//     <h2>Resultados del cuestionario</h2>
//     <p><strong>Aciertos:</strong> ${aciertos}</p>
//     <p><strong>Errores:</strong> ${preguntas.length - aciertos} </p>
//     </div>
//     `;
// }

// Mostrar Resultados al finalizar el cuestionario

function mostrarResultados() {
    let correctas = 0;
    preguntas.forEach((pregunta, i) => {
        if (respuestasUsuario[i] === pregunta.respuesta) {
            correctas++;
        }
    });
    preguntaC.innerHTML = `<h4>Resultados del Cuestionario</h4>`;
    opcionesC.innerHTML = `
    <p>Has contestado correctamente <strong>${correctas}</strong> de <strong>${preguntas.length}</strong> preguntas.</p>
    <p>Errores: <strong>${preguntas.length - correctas}</strong></p>
    `;

    btnAnterior.style.display = "none";
    btnSiguiente.style.display = "none";
}

// Mostrar la primera pregunta al cargar
mostrarPregunta();