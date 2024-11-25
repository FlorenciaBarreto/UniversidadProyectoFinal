// script.js
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(this);

    // Convertir FormData a un objeto
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Crear una cadena de parámetros de URL (query string)
    const queryString = new URLSearchParams(formObject).toString();

    // Realizar la solicitud fetch al servicio REST con el método GET
    fetch(`http://tu-api.com/endpoint?${queryString}`)
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data);
        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
        });
});
