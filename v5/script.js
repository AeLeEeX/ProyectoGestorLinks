// script.js

let currentUser = null;

// Mostrar sección activa (solo si el usuario ha iniciado sesión)
function showSection(sectionId) {
    if (!currentUser && sectionId !== 'loginSection' && sectionId !== 'registerSection') {
        alert("Debes iniciar sesión para acceder al gestor de links.");
        showSection('loginSection');
        return;
    }

    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Función para cargar y mostrar los enlaces específicos del usuario
function loadLinks() {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    userData.links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.classList.add('link-item');
        linkItem.innerHTML = `
            <h3>${link.title}</h3>
            <p><a href="${link.url}" target="_blank">${link.url}</a></p>
            <p>Etiquetas: ${link.tags}</p>
            <p>Notas: ${link.notes}</p>
            <button onclick="deleteLink(${index})">Eliminar</button>
        `;
        linkList.appendChild(linkItem);
    });
}

// Eliminar enlace del usuario actual
function deleteLink(index) {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.links.splice(index, 1); // Elimina el enlace según su índice
    localStorage.setItem(currentUser, JSON.stringify(userData)); // Actualiza en LocalStorage
    loadLinks(); // Recarga la lista de enlaces
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
        showSection('loginSection');
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
        currentUser = username;
        document.getElementById('usernameDisplay').textContent = username;
        loadLinks();
        document.getElementById('dashboard').classList.add('active');
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('registerSection').classList.add('hidden');
        showSection('dashboardSection'); // Abre automáticamente el gestor de links
    } else {
        alert('Usuario o contraseña incorrectos. Verifica tus datos.');
    }
});

// Cerrar Sesión
function logout() {
    currentUser = null;
    document.getElementById('dashboard').classList.remove('active');
    showSection('loginSection');
}

// Agregar Enlace
const linkForm = document.getElementById('linkForm');
linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const tags = document.getElementById('tags').value;
    const notes = document.getElementById('notes').value;

    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.links.push({ title, url, tags, notes });
    localStorage.setItem(currentUser, JSON.stringify(userData)); // Guarda los enlaces en LocalStorage

    loadLinks();
    linkForm.reset();
    showSection('dashboardSection');
});

// Inicializar la aplicación en la página de inicio de sesión al cargar
window.onload = () => {
    showSection('loginSection');
};
