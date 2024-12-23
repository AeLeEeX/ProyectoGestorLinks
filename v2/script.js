// script.js

// Mostrar sección activa
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Registro de Usuario
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // Guardar usuario en LocalStorage
    if (!localStorage.getItem(username)) {
        localStorage.setItem(username, JSON.stringify({ password, links: [] }));
        alert('Registro exitoso');
        showSection('loginSection');
    } else {
        alert('El usuario ya existe');
    }
});

// Inicio de Sesión
const loginForm = document.getElementById('loginForm');
let currentUser = null;

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Verificar usuario
    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        currentUser = username;
        document.getElementById('usernameDisplay').textContent = username;
        loadLinks();
        showDashboard();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Cargar Enlaces de Usuario
function loadLinks() {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    userData.links.forEach(link => {
        const linkItem = document.createElement('div');
        linkItem.classList.add('link-item');
        linkItem.innerHTML = `
            <h3>${link.title}</h3>
            <p><a href="${link.url}" target="_blank">${link.url}</a></p>
            <p>Etiquetas: ${link.tags}</p>
            <p>Recordatorio: ${link.reminderDate}</p>
            <p>Notas: ${link.notes}</p>
        `;
        linkList.appendChild(linkItem);
    });
}

// Mostrar Dashboard
function showDashboard() {
    document.getElementById('registerSection').classList.add('hidden');
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('dashboard').classList.add('active');
}

// Cerrar Sesión
function logout() {
    currentUser = null;
    showSection('loginSection');
    document.getElementById('dashboard').classList.remove('active');
}

// Agregar Enlace
const linkForm = document.getElementById('linkForm');
linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const tags = document.getElementById('tags').value;
    const reminderDate = document.getElementById('reminderDate').value;
    const notes = document.getElementById('notes').value;

    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.links.push({ title, url, tags, reminderDate, notes });
    localStorage.setItem(currentUser, JSON.stringify(userData));

    loadLinks();
    linkForm.reset();
});
