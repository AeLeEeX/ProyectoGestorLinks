// login.js

// Muestra solo el formulario de inicio de sesión y oculta el formulario de registro
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// Muestra solo el formulario de registro y oculta el formulario de inicio de sesión
function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Registro de Usuario
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (!localStorage.getItem(username)) {
        localStorage.setItem(username, JSON.stringify({ password, links: [] }));
        alert('Registro exitoso. Ahora inicia sesión.');
        showLoginForm();
    } else {
        alert('El usuario ya existe. Intenta con otro nombre de usuario.');
    }
});

// Inicio de Sesión
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        sessionStorage.setItem('currentUser', username);
        alert("Sesión iniciada correctamente");
        window.location.href = 'dashboard.html'; // Redirige al dashboard
    } else {
        alert('Usuario o contraseña incorrectos. Verifica tus datos.');
    }
});

// Asegura que el formulario de inicio de sesión esté visible al cargar la página
window.onload = function() {
    showLoginForm();
};
