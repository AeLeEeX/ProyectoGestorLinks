// dashboard.js

let currentUser = sessionStorage.getItem('currentUser');

// Verifica si el usuario ha iniciado sesión
if (!currentUser) {
    alert("Debes iniciar sesión para acceder al gestor de links.");
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
}

// Función para mostrar la sección deseada
function showSection(sectionId) {
    // Oculta todas las secciones
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('addLinkSection').classList.add('hidden');

    // Muestra solo la sección seleccionada
    document.getElementById(sectionId).classList.remove('hidden');
}

// Cargar y mostrar enlaces específicos del usuario
function loadLinks() {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = ''; // Limpia la lista para evitar duplicados

    userData.links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.classList.add('link-item');
        linkItem.innerHTML = `
            <div class="link-details">
                <h3>${link.title}</h3>
                <p><a href="${link.url}" target="_blank">${link.url}</a></p>
                <p><strong>Etiquetas:</strong> ${link.tags}</p>
                <p><strong>Notas:</strong> ${link.notes}</p>
            </div>
            <button class="delete-button" onclick="deleteLink(${index})">Eliminar</button>
        `;
        linkList.appendChild(linkItem);
    });
}

// Eliminar enlace
function deleteLink(index) {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.links.splice(index, 1); // Elimina el enlace según su índice
    localStorage.setItem(currentUser, JSON.stringify(userData)); // Actualiza en LocalStorage
    loadLinks(); // Recarga la lista de enlaces
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
    if (!userData.links) userData.links = []; // Asegura que 'links' esté definido
    userData.links.push({ title, url, tags, notes }); // Añade el nuevo enlace
    localStorage.setItem(currentUser, JSON.stringify(userData)); // Guarda los enlaces en LocalStorage

    loadLinks(); // Carga la lista actualizada de enlaces
    linkForm.reset(); // Limpia el formulario
    showSection('dashboardSection'); // Regresa al dashboard después de agregar el enlace
});

// Inicializa el dashboard cargando los enlaces y mostrando la sección principal
window.onload = () => {
    loadLinks();
    showSection('dashboardSection'); // Muestra el dashboard de forma predeterminada
};
