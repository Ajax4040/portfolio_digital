//Animación de la sección de "About me" al hacer scroll---------------------
const aboutMeSection = document.querySelector('#about-me');
const aboutMeH3 = document.querySelector('#about-me-h3');
const aboutMeImg = document.querySelector('#about-me-img');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutMeH3.classList.add('about-me-visible');
            aboutMeImg.classList.add('about-me-visible-2');
        }
    });
}, {
    threshold: 0.1 // Puedes ajustar este valor según tus necesidades
});

observer.observe(aboutMeSection);

//---------------------------------------------------------------------------
//Animacion inicial para el launcher
const rocket = document.getElementById('rocket');
const dialog = document.getElementById('dialog-box');

// Inicialmente, coloca tanto el rocket como el dialog-box fuera de vista
rocket.style.transform = 'translateY(120%)';
dialog.style.transform = 'translateY(250%)';

// Aplica la animación inicial de entrada al cohete
setTimeout(() => {
    rocket.style.transition = 'transform 7s ease';
    rocket.style.transform = 'translateY(0)';
}, 0);

// Espera a que la animación del cohete termine para iniciar la del cuadro de diálogo
setTimeout(() => {
    dialog.style.transition = 'transform 2s ease'; // Duración de transición más corta para dialog-box
    dialog.style.transform = 'translateY(0)';
    // Agrega la animación floating2 después de que la animación de entrada termine
    setTimeout(() => {
        dialog.classList.add('floating-animation');
    }, 2000); // Ajusta este tiempo al tiempo de duración de la animación de entrada del dialog
}, 7000); // Ajusta este tiempo al tiempo de duración de la animación de entrada del rocket

//----------------------------------------------------------------------------
//Animación para las imagenes de las redes en la seccion "contact"
const linkedin = document.querySelector('#linkedin');
const insta = document.querySelector('#insta');
const wsp = document.querySelector('#wsp');
const fb = document.querySelector('#fb');

let isReverse = false;

const rotateIcon = (icon, delay, rotation) => {
    setTimeout(() => {
        icon.style.transition = 'transform 1s ease';
        icon.style.transform = rotation;
    }, delay);
};

const startRotationSequence = () => {
    const rotation = isReverse ? 'rotate(-360deg)' : 'rotate(360deg)';
    const delayIncrement = 200; // 0.2 segundos

    if (!isReverse) {
        // Rotar de izquierda a derecha
        rotateIcon(linkedin, 0, rotation);
        rotateIcon(insta, delayIncrement, rotation);
        rotateIcon(wsp, delayIncrement * 2, rotation);
        rotateIcon(fb, delayIncrement * 3, rotation);
    } else {
        // Rotar de derecha a izquierda
        rotateIcon(fb, 0, rotation);
        rotateIcon(wsp, delayIncrement, rotation);
        rotateIcon(insta, delayIncrement * 2, rotation);
        rotateIcon(linkedin, delayIncrement * 3, rotation);
    }

    // Invierte la dirección de rotación para la próxima secuencia
    isReverse = !isReverse;
};

// Inicia la secuencia inicialmente
startRotationSequence();

// Repite la secuencia cada 3 segundos más la duración total de la animación
setInterval(startRotationSequence, 3000 + (200 * 3) + 1000); // 1000 ms adicionales para la animación

