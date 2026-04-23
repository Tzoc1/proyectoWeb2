// Función para actualizar el nombre de usuario en la topbar
function actualizarCuenta() {
    const cuentaElement = document.getElementById('cuenta');
    const usuario = localStorage.getItem('User');

    if (usuario) {
        cuentaElement.textContent = usuario;
        cuentaElement.classList.add = 'user';
        
    } else {
        cuentaElement.textContent = 'Sin usuario';
    }
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', actualizarCuenta);