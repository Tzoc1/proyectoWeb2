let Usuario = localStorage.getItem('User')
let Contrasena = localStorage.getItem('Password')

// index.js

function usuario(e) {
    e.preventDefault(); // evita que el formulario recargue la página

    const tempU = document.getElementById('user').value;
    const tempC = document.getElementById('pass').value;

    // Guardar en localStorage (opcional, si quieres usar después)
    localStorage.setItem('User', tempU);
    localStorage.setItem('Password', tempC);

    // Mensaje de éxito
    alert('Login exitoso');

    // Redirigir al catálogo
    window.location.href = 'catalogo.html';
}

// Asignar el evento al botón
document.getElementById('bs').addEventListener('click', usuario);
