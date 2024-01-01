//Se detecta cuando se hace click la imagen de la nave
document.getElementById('rocket').addEventListener('click', function() {
    //Se detecta el ancho de la pantalla
    if (window.innerWidth < 1000) {
        Swal.fire({
            title: "For playing this game, please use a desktop computer.",
            width: 400,
            padding: "1em",
            color: "#fff",
            background: "#fff url(images/espacio2.jpg)",
            backdrop: `rgba(83,26,138,0.3)`
        });
        //Se oculta el launcher ya que no se puede jugar en movil
        document.getElementById("launcher").style.display = "none";
    } else {
        console.log("Se muestra preGame.");
        document.getElementById("preGame").style.display = "flex";   
    }
});

//Boton de exit
document.getElementById('exit').addEventListener('click', function() {
    document.getElementById('preGame').style.display = 'none';
});

//Boton de start
document.getElementById('start').addEventListener('click', function() {
    ocultarSecciones();
    iniciarJuego();
});

function ocultarSecciones() {
    console.log("Se ocultan las secciones.");
    document.getElementById("main").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("launcher").style.display = "none";

    document.body.style.height = "100vh";
}

function iniciarJuego() {
    console.log("Se inicia el juego.");
    document.getElementById('preGame').style.display = 'none';
    document.getElementById("rocket").style.pointerEvents = "none";
    document.getElementById("header").style.animation = "slideUp 1.5s ease";
    document.getElementById("rocket2").style.display = "flex";
    document.getElementById("asteroid1").style.display = "flex";
    document.getElementById("asteroid2").style.display = "flex";
    document.getElementById("asteroid3").style.display = "flex";
    document.getElementById("closeGame").style.display = "flex";
    document.getElementById("countdown").style.display = "flex";
    updateClock();
    juegoActivo = true;
    activarMovimientoNave();
}

let totalTime = 5;
function updateClock() {
document.getElementById('countdown').innerHTML = totalTime;
if(totalTime==0){
    document.getElementById("countdown").style.display = "none";
    //cambiar "animation: scroll 90s linear infinite;" por "animation: scroll 10s linear infinite;" del body
    document.body.style.animation = "scroll 30s linear infinite";
    posYAsteroid = -60; // Reiniciar posición del asteroide
    inicioAsteroid3 = Date.now();
    inicioJuego = Date.now(); // Reiniciar el tiempo de inicio del juego
    velocidadIncrementada = false; // Asegurarse de que las velocidades se puedan incrementar
    requestAnimationFrame(moverYDetectarColision);
}else{
    totalTime-=1;
    setTimeout(updateClock,1000);
}
}

// Sección de juego-------------------------------------------------------------

//Funciones para el movimiento de los asteroides------------------------------

let posYAsteroid1 = -60; // Posición inicial del primer asteroide
let posYAsteroid2 = -120; // Posición inicial más alta para el segundo asteroide
let velocidadAsteroid1 = 3; // Velocidad del primer asteroide
let velocidadAsteroid2 = 4; // Velocidad mayor para el segundo asteroide
let posYAsteroid3 = -60; // Posición inicial del tercer asteroide
let velocidadAsteroid3 = 3.5; // Velocidad intermedia para el tercer asteroide
let inicioAsteroid3 = Date.now(); // Tiempo de inicio del juego
let inicioJuego = Date.now(); // Tiempo de inicio del juego
let velocidadIncrementada = false;
const valorIncremento = 1.1;

function moverYDetectarColision() {
    const tiempoActual = Date.now();

    // Incrementar velocidades cada 40 segundos
    if (tiempoActual - inicioJuego > 40000) {
        velocidadAsteroid1 += valorIncremento; 
        velocidadAsteroid2 += valorIncremento;
        velocidadAsteroid3 += valorIncremento;

        document.body.style.animation = "scroll 15s linear infinite";
        console.log("Se incrementa la velocidad.");

        inicioJuego += 40000; // Reiniciar el tiempo para el próximo incremento
    }
    
    const asteroid1 = document.getElementById('asteroid1');
    const asteroid2 = document.getElementById('asteroid2');
    const asteroid3 = document.getElementById('asteroid3');
    const rocket2 = document.getElementById('rocket2');

    // Mover el primer asteroide
    posYAsteroid1 += velocidadAsteroid1;
    asteroid1.style.top = posYAsteroid1 + 'px';

    // Mover el segundo asteroide solo si ha pasado suficiente tiempo
    if (posYAsteroid2 < window.innerHeight) {
        posYAsteroid2 += velocidadAsteroid2;
        asteroid2.style.top = posYAsteroid2 + 'px';
    }

    // Reiniciar y cambiar posición horizontal aleatoriamente para ambos asteroides
    // Primer asteroide
    if (posYAsteroid1 > window.innerHeight) {
        posYAsteroid1 = -60;
        let posXAsteroid1 = Math.random() * (window.innerWidth - asteroid1.offsetWidth);
        asteroid1.style.left = posXAsteroid1 + 'px';
    }

    // Segundo asteroide
    if (posYAsteroid2 > window.innerHeight) {
        posYAsteroid2 = -60; // Puedes ajustar este valor para cambiar el retardo
        let posXAsteroid2 = Math.random() * (window.innerWidth - asteroid2.offsetWidth);
        asteroid2.style.left = posXAsteroid2 + 'px';
    }

    // Mover el tercer asteroide solo si han pasado 15 segundos
    if (Date.now() - inicioAsteroid3 > 15000) {
        posYAsteroid3 += velocidadAsteroid3;
        asteroid3.style.top = posYAsteroid3 + 'px';

        if (posYAsteroid3 > window.innerHeight) {
            posYAsteroid3 = -60; 
            let posXAsteroid3 = Math.random() * (window.innerWidth - asteroid3.offsetWidth);
            asteroid3.style.left = posXAsteroid3 + 'px';
        }
    }

    // Detectar colisiones para ambos asteroides
    const rectAsteroid1 = asteroid1.getBoundingClientRect();
    const rectAsteroid2 = asteroid2.getBoundingClientRect();
    const rectRocket = rocket2.getBoundingClientRect();

    // Colisión con el primer asteroide
    if (detectarColision(rectAsteroid1, rectRocket)) {
        juegoActivo = false;
        document.body.style.animation = "none";
        alert("¡Colisión con el primer asteroide! Juego terminado.");
    }

    // Colisión con el segundo asteroide
    if (detectarColision(rectAsteroid2, rectRocket)) {
        juegoActivo = false;
        document.body.style.animation = "none";
        alert("¡Colisión con el segundo asteroide! Juego terminado.");
    }

     // Detectar colisiones para el tercer asteroide
     const rectAsteroid3 = asteroid3.getBoundingClientRect();
     if (detectarColision(rectAsteroid3, rectRocket)) {
         juegoActivo = false;
         document.body.style.animation = "none";
         alert("¡Colisión con el tercer asteroide! Juego terminado.");
     }

    if (juegoActivo) {
        requestAnimationFrame(moverYDetectarColision);
    }
}

function detectarColision(rectA, rectB) {
    // Margen de "buffer" para hacer la colisión más precisa
    let buffer = 10;

    return rectA.x + buffer < rectB.x + rectB.width - buffer &&
           rectA.x + rectA.width - buffer > rectB.x + buffer &&
           rectA.y + buffer < rectB.y + rectB.height - buffer &&
           rectA.y + rectA.height - buffer > rectB.y + buffer;
}

//Funciones para el movimiento de la nave---------------------------------------
const stepSize = 15; // Ajusta la velocidad de movimiento aquí
let juegoActivo = false;
let handleKeyDown; // Guarda la referencia al manejador del evento

function activarMovimientoNave() {
    const rocket2 = document.getElementById("rocket2");
    let positionRight = 0; // Posición inicial en el borde derecho

    rocket2.style.right = positionRight + 'px'; // Establecer posición inicial

    handleKeyDown = function(e) {
        if (!juegoActivo) return; // Ignora las teclas si el juego no está activo

        if (e.key === 'ArrowLeft') {
            positionRight += stepSize;
            // Verifica que no se salga por el lado izquierdo
            positionRight = Math.min(positionRight, window.innerWidth - rocket2.offsetWidth);
        } else if (e.key === 'ArrowRight') {
            positionRight -= stepSize;
            // Verifica que no se salga por el lado derecho
            positionRight = Math.max(0, positionRight);
        }
        rocket2.style.right = positionRight + 'px';
    }

    document.addEventListener('keydown', handleKeyDown);
}

//--------------------------------------------------------------------------

//Funcion para cerrar el juego------------------------------------------------
document.getElementById('closeGame').addEventListener('click', function() {
    juegoActivo = false; // Indica que el juego ya no está activo
    document.removeEventListener('keydown', handleKeyDown); // Elimina el manejador del evento de teclado
    //recargar la pagina original
    location.reload();
});
//--------------------------------------------------------------------------
