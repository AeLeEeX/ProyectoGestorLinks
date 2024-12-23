// script.js

// Mostrar sección activa
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Formulario de agregar enlace
const linkForm = document.getElementById('linkForm');
const linkList = document.getElementById('linkList');

linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const tags = document.getElementById('tags').value;
    const reminderDate = document.getElementById('reminderDate').value;
    const notes = document.getElementById('notes').value;

    // Crear nuevo enlace
    const linkItem = document.createElement('div');
    linkItem.classList.add('link-item');
    linkItem.innerHTML = `
        <h3>${title}</h3>
        <p><a href="${url}" target="_blank">${url}</a></p>
        <p>Etiquetas: ${tags}</p>
        <p>Recordatorio: ${reminderDate}</p>
        <p>Notas: ${notes}</p>
    `;

    linkList.appendChild(linkItem);

    // Limpiar formulario
    linkForm.reset();
    showSection('dashboard');
});
