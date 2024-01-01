document.getElementById('rocket').addEventListener('click', function() {
    if (window.innerWidth < 1024) {
        Swal.fire({
            title: "For playing this game, please use a desktop computer.",
            width: 400,
            padding: "1em",
            color: "#fff",
            background: "#fff url(images/espacio2.jpg)",
            backdrop: `rgba(83,26,138,0.3)`
        });
        //se oculta el div de class dialog-box
        document.getElementById("dialog-box").style.display = "none";
        document.getElementById("rocket").style.display = "none";

    } else {
        console.log("Se muestra pregame.");
        document.getElementById("pregame").style.display = "flex";   
    }
});


//Boton de exit
document.getElementById('exit').addEventListener('click', function() {
    document.getElementById('pregame').style.display = 'none';
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
    document.getElementById("dialog-box").style.display = "none";

    document.body.style.height = "100vh";
}

function iniciarJuego() {
    console.log("Se inicia el juego.");
    document.getElementById('pregame').style.display = 'none';
    document.getElementById("rocket").style.pointerEvents = "none";
    document.getElementById("header").style.animation = "slideUp 1.5s ease";
    document.getElementById("closeGame").style.display = "flex";
    document.getElementById("countdown").style.display = "flex";
    updateClock();
}

let totalTime = 5;
function updateClock() {
document.getElementById('countdown').innerHTML = totalTime;
if(totalTime==0){
    document.getElementById("countdown").style.display = "none";
    console.log('Final');
}else{
    totalTime-=1;
    setTimeout(updateClock,1000);
}
}