let Usuario = localStorage.getItem('User')
let Contrasena = localStorage.getItem('Password')

function usuario() {
    tempU = document.getElementById('user').value;
    tempC = document.getElementById('pass').value;

    localStorage.setItem('User', tempU);
    localStorage.setItem('Password', tempC);

    // Actualizar la cuenta en la topbar después del login
    actualizarCuenta();
    window.location.href = 'catalogo.html';
}