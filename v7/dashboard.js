// dashboard.js

let currentUser = sessionStorage.getItem('currentUser');

// Verifica si el usuario ha iniciado sesión
if (!currentUser) {
    alert("Debes iniciar sesión para acceder al gestor de links.");
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
}

// Cargar y mostrar enlaces del usuario
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

// Eliminar enlace
function deleteLink(index) {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.links.splice(index, 1);
    localStorage.setItem(currentUser, JSON.stringify(userData));
    loadLinks();
}

// Cerrar Sesión
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html'; // Redirige al inicio de sesión
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
    localStorage.setItem(currentUser, JSON.stringify(userData));

    loadLinks();
    linkForm.reset();
    showSection('dashboardSection');
});

// Inicializa el dashboard
window.onload = () => {
    loadLinks();
};
