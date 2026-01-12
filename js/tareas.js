// Arreglo para almacenar tareas
let listaDeTareas = [];

const formulario = document.getElementById('form-tareas');
const contenedorUl = document.getElementById('lista-tareas-ul');

// EVENTO: Agregar Tarea
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const texto = document.getElementById('input-texto-tarea').value;
    const prioridad = document.getElementById('select-prioridad').value;

    const nuevaTarea = {
        id: Date.now(),
        nombre: texto,
        prioridad: parseInt(prioridad)
    };

    listaDeTareas.push(nuevaTarea);
    actualizarInterfaz();
    formulario.reset();
});

// FUNCIÓN: Dibujar las tareas en el HTML
function actualizarInterfaz() {
    // ORDENAR: Las de prioridad 1 van primero, luego 2, luego 3
    listaDeTareas.sort((a, b) => a.prioridad - b.prioridad);

    contenedorUl.innerHTML = '';

    listaDeTareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `task-item prioridad-${tarea.prioridad}`;
        
        li.innerHTML = `
            <div class="task-info">
                <span class="task-name">${tarea.nombre}</span>
                <span class="task-priority-text">Prioridad: ${tarea.prioridad}</span>
            </div>
            <div class="task-actions">
                <span class="btn-edit" onclick="editarTarea(${tarea.id})" title="Editar">✏️</span>
                <span class="btn-delete" onclick="eliminarTarea(${tarea.id})" title="Eliminar">🗑️</span>
            </div>
        `;
        contenedorUl.appendChild(li);
    });
}

// FUNCIÓN: Eliminar Tarea
function eliminarTarea(id) {
    if(confirm("¿Estás seguro de eliminar esta tarea?")) {
        listaDeTareas = listaDeTareas.filter(t => t.id !== id);
        actualizarInterfaz();
    }
}

// FUNCIÓN: Editar Tarea
function editarTarea(id) {
    const tarea = listaDeTareas.find(t => t.id === id);
    const nuevoNombre = prompt("Modifica la tarea:", tarea.nombre);
    
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        tarea.nombre = nuevoNombre;
        actualizarInterfaz();
    }
}