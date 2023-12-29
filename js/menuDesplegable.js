let menu = document.querySelector('#menu-desplegable');
menu.style.display = 'none';

document.querySelector('.menu-icon').addEventListener('click', function() {
    toggleMenu(menu);
});

document.querySelectorAll('#menu-desplegable ul li a').forEach(item => {
    item.addEventListener('click', function() {
        console.log('Click en el enlace: ' + item.textContent);
        toggleMenu(menu);
    });
});

// Cerrar el menú cuando se toca fuera de los enlaces
menu.addEventListener('touchstart', function(event) {
    if (event.target === menu || event.target.tagName === 'UL') {
        console.log('Click fuera en el menú.');
        toggleMenu(menu);
    }
}, { passive: true });

function toggleMenu(menu) {
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}
