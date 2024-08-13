document.addEventListener('DOMContentLoaded', () => {
    const preguntaContainer = document.getElementById('pregunta-container');
    const opcionesContainer = document.getElementById('opciones-container');
    const verificarBtn = document.getElementById('verificar-btn');
    const cambiarBtn = document.getElementById('cambiar-btn');
    const resultado = document.getElementById('resultado');

    let preguntaActual;
    let respuestaSeleccionada;
    let botonesOpciones = [];

    // Cargar las preguntas desde el archivo JSON
    fetch('preguntas.json')
        .then(response => response.json())
        .then(data => {
            const preguntas = data.preguntas;
            mostrarPregunta(preguntas);

            // Cambiar pregunta al hacer clic en el botón
            cambiarBtn.addEventListener('click', () => {
                mostrarPregunta(preguntas);
            });
        });

    function mostrarPregunta(preguntas) {
        const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
        preguntaActual = preguntas[indiceAleatorio];

        preguntaContainer.textContent = preguntaActual.pregunta;
        opcionesContainer.innerHTML = '';
        resultado.textContent = '';
        respuestaSeleccionada = null;

        botonesOpciones = [];

        for (const [opcion, texto] of Object.entries(preguntaActual.opciones)) {
            const button = document.createElement('button');
            button.textContent = `${opcion} ${texto}`;
            button.classList.add('opcion-btn');
            button.onclick = () => seleccionarRespuesta(button, opcion);
            opcionesContainer.appendChild(button);
            botonesOpciones.push(button);
        }
    }

    function seleccionarRespuesta(button, opcion) {
        respuestaSeleccionada = opcion;

        // Remover la clase 'seleccionada' de todos los botones
        botonesOpciones.forEach(boton => boton.classList.remove('seleccionada'));

        // Agregar la clase 'seleccionada' al botón clicado
        button.classList.add('seleccionada');

        resultado.textContent = '';
    }

    verificarBtn.addEventListener('click', () => {
        if (!respuestaSeleccionada) {
            resultado.textContent = 'Por favor, selecciona una respuesta.';
            return;
        }

        if (respuestaSeleccionada === preguntaActual.correcta) {
            resultado.textContent = '¡Correcto!';
            resultado.style.color = 'green';
        } else {
            resultado.textContent = 'Incorrecto, inténtalo de nuevo.';
            resultado.style.color = 'red';
        }
    });
});
