emailjs.init("ZJRc9J7rmSE8ay2DX"); // Reemplaza con tu User ID de EmailJS

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Cambia 'tu_service_id' y 'tu_template_id' con los IDs correspondientes de EmailJS
    emailjs.sendForm('service_0wnbo8w', 'template_5x14fot', this)
        .then(function() {
            Swal.fire({
                title: "Gracias por tu mensaje!",
                width: 600,
                padding: "3em",
                color: "#fff",
                background: "#fff url(images/espacio2.jpg)",
                backdrop: `
                  rgba(83,26,138,0.3)
                  url("images/chuck.gif")
                  center bottom
                  no-repeat
                `
              });
            form.reset(); // Opcional: resetear el formulario después del envío
        }, function(error) {
            alert('Error al enviar el mensaje: ' + JSON.stringify(error));
        });
});

