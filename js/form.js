emailjs.init("ZJRc9J7rmSE8ay2DX"); // Tu User ID de EmailJS

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Muestra el SweetAlert con el temporizador
    Swal.fire({
        title: "Aguarde un momento...",
        html: "Enviando mensaje...",
        background: "rgba(83,26,138,1)",
        color: "#fff",
        timer: 20000, // Aumenta el tiempo si es necesario
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            // Lógica adicional si es necesaria al cerrar
        }
    });

    // Envía el formulario con EmailJS
    emailjs.sendForm('service_0wnbo8w', 'template_5x14fot', this)
        .then(function() {
            // Cuando el mensaje se ha enviado correctamente, resetea el formulario
            form.reset();

            // Cierra el SweetAlert actual y muestra el mensaje de éxito
            Swal.fire({
                title: "Gracias por tu mensaje!",
                width: 600,
                padding: "3em",
                color: "#fff",
                background: "rgba(83,26,138,0.3) url(images/espacio2.jpg)",
                backdrop: `
                    rgba(83,26,138,0.3)
                    url("images/chuck.gif")
                    center bottom
                    no-repeat
                `
            });
        }, function(error) {
            Swal.fire('Error', 'Error al enviar el mensaje: ' + JSON.stringify(error), 'error');
        });
});
