//Se detecta cuando se hace click la imagen de la nave
document.getElementById('rocket').addEventListener('click', function() {
    //Se detecta el ancho de la pantalla
    if (window.innerWidth < 1000) {
        Swal.fire({
            title: "For playing this game, please use a desktop computer.",
            width: 400,
            padding: "1em",
            color: "#fff",
            background: "rgba(83,26,138,0.3) url(images/espacio2.jpg)",
            backdrop: `rgba(83,26,138,0.3)`
        });
        //Se oculta el launcher ya que no se puede jugar en movil
        document.getElementById("launcher").style.display = "none";
    } else {
        console.log("Se muestra preGame.");
        document.getElementById("preGame").style.display = "flex";   
    }
});
//--------------------------------------------------------------------------

//Boton de exit
document.getElementById('exit').addEventListener('click', function() {
    document.getElementById('preGame').style.display = 'none';
});
//--------------------------------------------------------------------------

// Botón de inicio
document.getElementById('start').addEventListener('click', function() {
    configurarJuego();
    iniciarConteo();
});

let ultimoIncrementoVelocidad;
const intervaloIncremento = 60000; // 60 segundo
let ultimoIncrementoContador;
const rangoContador = 400;
let puntos = 0;
let conteoIncrementos = 0;
const maxIncrementos = 7; // Límite de incrementos

// Configuración inicial del juego
function configurarJuego() {
    ocultarSecciones(["main", "footer", "launcher", "preGame"]);
    document.getElementById("countdown").style.display = "flex";
    document.getElementById("rocket").style.pointerEvents = "none";
    document.getElementById("header").style.animation = "slideUp 1.5s ease";
    document.body.style.height = "100vh";
    document.body.style.animation = "scroll 30s linear infinite";
    mostrarElementos(["rocket2", "asteroid1", "asteroid2", "asteroid3", "closeGame", "counter", "pauseMusic"]);
}

// Conteo regresivo
let totalTime = 5;
function iniciarConteo() {
    function updateClock() {
        document.getElementById('countdown').innerHTML = totalTime;
        if (totalTime == 0) {
            document.getElementById("countdown").style.display = "none";
            inicioJuego = Date.now();
            juegoActivo = true;
            ultimoIncrementoVelocidad = Date.now();
            ultimoIncrementoContador = Date.now();
            activarAudio();
            requestAnimationFrame(moverYDetectarColision);
            activarMovimientoNave();
        } else {
            totalTime -= 1;
            setTimeout(updateClock, 1000);
        }
    }
    updateClock();
}

// Funciones para el movimiento de los asteroides
const asteroides = [
    { id: 'asteroid1', posY: -60, velocidad: 3 },
    { id: 'asteroid2', posY: -120, velocidad: 4, retardo: 15000 },
    { id: 'asteroid3', posY: -60, velocidad: 3.5, retardo: 15000 }
];

function moverAsteroides() {
    const divContador = document.getElementById('counter');
    const rocketRect = document.getElementById('rocket2').getBoundingClientRect();
    let colision = false;

    const tiempoActual = Date.now();
    const tiempoActualContador = Date.now();

    if (tiempoActual - ultimoIncrementoVelocidad > intervaloIncremento && conteoIncrementos < maxIncrementos) {
        asteroides.forEach(asteroide => {
            asteroide.velocidad += 1; // Incrementa la velocidad
        });
        if (conteoIncrementos == 0) {
            document.body.style.animation = "scroll 15s linear infinite";
        }
        if (conteoIncrementos == 1) {
            document.body.style.animation = "scroll 10s linear infinite";
        }
        if (conteoIncrementos == 2) {
            document.body.style.animation = "scroll 7s linear infinite";
        }
        ultimoIncrementoVelocidad = tiempoActual; // Actualiza el momento del último incremento
        conteoIncrementos++;
        console.log('Incrementando velocidad: ' + conteoIncrementos); 
    }

    //Agregar un contador de puntos en el elemnto del dom con id "counter"
    if (tiempoActualContador - ultimoIncrementoContador > rangoContador) {
        puntos += 1; // Incrementan los puntos
        // Formatear los puntos para que siempre tengan 5 dígitos, rellenando con ceros a la izquierda
        let puntosFormateados = puntos.toString().padStart(6, '0');
        //Poner los puntos en el elemento p del dom con id "counter"
        divContador.innerHTML = puntosFormateados;
        ultimoIncrementoContador = tiempoActualContador; // Actualiza el momento del último incremento
    }

    asteroides.forEach(asteroide => {
        const elem = document.getElementById(asteroide.id);
        if (Date.now() - inicioJuego > (asteroide.retardo || 0)) {
            asteroide.posY += asteroide.velocidad;
            elem.style.top = asteroide.posY + 'px';

            if (asteroide.posY > window.innerHeight) {
                asteroide.posY = -60;
                elem.style.left = Math.random() * (window.innerWidth - elem.offsetWidth) + 'px';
            }

            if (detectarColision(elem.getBoundingClientRect(), rocketRect)) {
                colision = true;
            }
        }
    });

    if (colision) {
        juegoActivo = false;
        document.body.style.animation = "none";
        desactivarAudio();
        alert("¡Colisión! Juego terminado.");
    } else if (juegoActivo) {
        requestAnimationFrame(moverAsteroides);
    }
}

function moverYDetectarColision() {
    moverAsteroides();
}

function detectarColision(rectA, rectB) {
    let buffer = 8;
    return rectA.x + buffer < rectB.x + rectB.width - buffer &&
           rectA.x + rectA.width - buffer > rectB.x + buffer &&
           rectA.y + buffer < rectB.y + rectB.height - buffer &&
           rectA.y + rectA.height - buffer > rectB.y + buffer;
}

// Funcion para mostrar elementos
function mostrarElementos(elementos) {
    elementos.forEach(id => {
        document.getElementById(id).style.display = 'flex';
    });
}

// Funcion para mostrar secciones
function ocultarSecciones(secciones) {
    secciones.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}
//--------------------------------------------------------------------------

//Funciones para el movimiento de la nave
let positionRight = 0; // Posición inicial en el borde derecho
let movingLeft = false;
let movingRight = false;
const stepSize = 10; // Ajusta el tamaño del paso

function actualizarMovimientoNave() {
    if (!juegoActivo) return;

    if (movingLeft) {
        positionRight += stepSize;
        positionRight = Math.min(positionRight, window.innerWidth - rocket2.offsetWidth);
    }
    if (movingRight) {
        positionRight -= stepSize;
        positionRight = Math.max(0, positionRight);
    }

    rocket2.style.right = positionRight + 'px';

    requestAnimationFrame(actualizarMovimientoNave);
}

function activarMovimientoNave() {
    const rocket2 = document.getElementById("rocket2");
    rocket2.style.right = positionRight + 'px'; // Establecer posición inicial

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') movingLeft = true;
        if (e.key === 'ArrowRight') movingRight = true;
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'ArrowLeft') movingLeft = false;
        if (e.key === 'ArrowRight') movingRight = false;
    });

    requestAnimationFrame(actualizarMovimientoNave);
}
//--------------------------------------------------------------------------

//Funcion para cerrar el juego
document.getElementById('closeGame').addEventListener('click', function() {
    juegoActivo = false; // Indica que el juego ya no está activo
    desactivarAudio();
    location.reload();//Recargar la pagina original
});
//--------------------------------------------------------------------------

//Funciones para la musica
function activarAudio() {
    console.log("Se activa audio.");
    let audio1 = document.getElementById('music');
    let audio2 = document.getElementById('music2');

    if (audio1.ended) {
        // Si el primer audio ya terminó, reproducir el segundo audio
        audio2.volume = 0.2;
        audio2.play();
    } else {
        // Si no, reproducir el primer audio
        audio1.volume = 0.2;
        //audio1.playbackRate = 2; //velocidad de la musica
        audio1.play();
    }
}

//Si se hace click en el boton de pausar musica se llama a la funcion desactivarAudio y si la musica esta pausada se llama a la funcion activarAudio
document.getElementById('pauseMusic').addEventListener('click', function() {
    let audio1 = document.getElementById('music');
    let audio2 = document.getElementById('music2');

    // Verificar si alguno de los audios está actualmente en reproducción
    if (!audio1.paused || !audio2.paused) {
        desactivarAudio();
    } else {
        activarAudio();
    }
});

function desactivarAudio() {
    console.log("Se desactiva audio.");
    let audio1 = document.getElementById('music');
    let audio2 = document.getElementById('music2');

    audio1.pause();
    audio2.pause();
}

document.getElementById('music').addEventListener('ended', function() {
    let audio2 = document.getElementById('music2');
    audio2.volume = 0.3;
    audio2.play();
});


//--------------------------------------------------------------------------