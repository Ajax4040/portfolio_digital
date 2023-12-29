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

//Animacion para aparecer el cohete al entrar a la pagina---------------------
const rocket = document.getElementById('rocket');

// Aplica la animación inicial de entrada
rocket.style.transform = 'translateY(120%)';
setTimeout(() => {
    rocket.style.transition = 'transform 5s ease';
    rocket.style.transform = 'translateY(0)';
}, 0);

// Elimina la animación inicial y comienza la animación de pulsación
setTimeout(() => {
    // Restablece los estilos de transición para permitir el hover
    rocket.style.transition = '';
    rocket.style.transform = '';

    // Inicia la animación de pulsación
    setInterval(() => {
        rocket.style.transition = 'transform 0.2s ease';
        rocket.style.transform = 'scale(1.1)';

        setTimeout(() => {
            rocket.style.transform = 'scale(1)';
        }, 200); // Duración de la primera parte de la pulsación

    }, 5000); // Repite cada 5 segundos
}, 5000); // Comienza después de que la animación inicial termine
