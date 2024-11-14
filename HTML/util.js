//BOTON PARA VOLVER HASTA ARRIBA
document.addEventListener('DOMContentLoaded', function () {
    // Mostrar el botón "Volver arriba" cuando el usuario haga scroll
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopButton.style.display = 'block'; // Mostrar el botón
        } else {
            scrollToTopButton.style.display = 'none'; // Ocultar el botón
        }
    };

    // Al hacer clic en el botón, volver al principio de la página
    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
