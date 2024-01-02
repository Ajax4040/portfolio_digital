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
const intervaloIncremento = 20000; // 30 segundos en milisegundos
let conteoIncrementos = 0;
const maxIncrementos = 6; // Límite de incrementos

// Configuración inicial del juego
function configurarJuego() {
    ocultarSecciones(["main", "footer", "launcher", "preGame"]);
    document.getElementById("countdown").style.display = "flex";
    document.getElementById("rocket").style.pointerEvents = "none";
    document.getElementById("header").style.animation = "slideUp 1.5s ease";
    document.body.style.height = "100vh";
    document.body.style.animation = "scroll 30s linear infinite";
    mostrarElementos(["rocket2", "asteroid1", "asteroid2", "asteroid3", "closeGame"]);
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
    const rocketRect = document.getElementById('rocket2').getBoundingClientRect();
    let colision = false;

    const tiempoActual = Date.now();
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

//Funcion para cerrar el juego------------------------------------------------
document.getElementById('closeGame').addEventListener('click', function() {
    juegoActivo = false; // Indica que el juego ya no está activo
    location.reload();//Recargar la pagina original
});
//--------------------------------------------------------------------------
