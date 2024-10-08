// Variables para el chat
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const fileInput = document.getElementById('file-input');
const emojiButton = document.getElementById('emoji-button');
const fileButton = document.getElementById('file-button');
const continueButton = document.querySelector('.continue-button');
const backButton = document.querySelector('.back-button');
const fullscreenButton = document.querySelector('.fullscreen-button');
// Obtener referencias a los elementos del DOM
const chatInput = document.getElementById('chatInput');
const chatBoxElement = document.getElementById('chatBox');
const sendChatBtn = document.getElementById('sendChatBtn');
// Obtener referencias a los elementos del DOM
const teamMembersTable = document.getElementById('teamMembersTable');
const memberNameInput = document.getElementById('memberName');
const memberEmailInput = document.getElementById('memberEmail');
const memberRoleSelect = document.getElementById('memberRole');
const addMemberButton = document.getElementById('addMemberButton');
const notification = document.getElementById('notification');
// Obtener referencias a los elementos del DOM
const taskList = document.querySelector('.tasks');
const searchBar = document.querySelector('.search-bar');
const progressPercentage = document.querySelector('.progress-percentage');
const timelineEvents = document.querySelector('.timeline-events');
const activityLogElement = document.querySelector('.log');
const addNewTaskButton = document.querySelector('.add-task');



let typingTimeout;
let messages = [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let timelineEvent = JSON.parse(localStorage.getItem('timelineEvents')) || [];
let activityLog = JSON.parse(localStorage.getItem('activityLog')) || [];

// Cargar historial de chat desde el localStorage
loadChatHistory();

// Función para enviar mensajes
sendButton.addEventListener('click', () => {
    sendMessage(messageInput.value);
});


// Función para enviar un mensaje
function sendMessage(message) {
    if (message.trim()) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        console.log('Mensaje enviado:', message);
        messageInput.value = ''; // Limpiar el input
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazamiento automático
        saveMessageToHistory(message);
        notifyNewMessage();
    }
}

// Notificación de nuevos mensajes
function notifyNewMessage() {
    
}

// Indicador de escritura
messageInput.addEventListener('input', () => {
    typingIndicator.style.display = 'block';
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000); // Ocultar después de 1 segundo
});

// Envío de archivos
fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Archivo enviado: ${file.name}';
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveMessageToHistory('[Archivo enviado: ${file.name}]');
        notifyNewMessage();
    }
});


// Funciones para manejar el historial de chat
function saveMessageToHistory(message) {
    messages.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}
// Función para regresar a la página anterior
function goBack() {
    window.history.back(); // O redirige a una URL específica
}



function loadChatHistory() {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
        messages = JSON.parse(storedHistory);
        renderChatHistory();
    }
}

function renderChatHistory() {
    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
    });
    chatBox.scrollTop = chatBox.scrollTop = chatBox.scrollHeight;
}
// Eventos para el chat
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        messageInput.value = ''; // Limpiar el campo de entrada
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo
    }
});
// Función para agregar un emoji
emojiButton.addEventListener('click', () => {
    messageInput.value += '😊'; // Agregar un emoji al campo de entrada
    messageInput.focus(); // Mantener el foco en el campo de entrada
});

// Función para manejar la selección de archivos
fileButton.addEventListener('click', () => {
    fileInput.click(); // Simular un clic en el input de archivo
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage(messageInput.value);
    }
});
messageInput.addEventListener('input', () => {
    typingIndicator.style.display = 'block';
    clearTimeout(typingTimeout); 
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000); // ocultal despues de un segundo
});
fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Archivo enviado: ${file.name}';
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveMessageToHistory('[Archivo enviado: ${file.name}]');
        notifyNewMessage();
    }
});
// Funcionalidad de emojis
emojiButton.addEventListener('click', () => {
    messageInput.value += '😊'; // Agregar un emoji simple
});

// Boton Pantalla completa
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen(); // Solicita pantalla completa
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen(); // Sale del modo de pantalla completa
        }
    }
});
// Función para enviar un mensaje
sendChatBtn.addEventListener('click', () => {
    const message = chatInput.value.trim(); // Obtener el valor del input y eliminar espacios en blanco
    if (message) { // Verificar que el mensaje no esté vacío
        const messageElement = document.createElement('p'); // Crear un nuevo elemento de párrafo
        messageElement.innerHTML = `<strong>Tú:</strong> ${message}`; // Formatear el mensaje
        chatBoxElement.appendChild(messageElement); // Añadir el mensaje al chat
        chatInput.value = ''; // Limpiar el campo de entrada
        chatBoxElement.scrollTop = chatBoxElement.scrollHeight; // Desplazar hacia abajo para mostrar el último mensaje
    }
});

// Opcional: permitir enviar mensajes con la tecla Enter
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendChatBtn.click(); // Simular clic en el botón de enviar
    }
});

// Array para almacenar los proyectos
let projects = [];

// Array para almacenar los miembros del equipo
let teamMembers = [];

// Evento para mostrar/ocultar el formulario de nuevo proyecto
document.getElementById('newProjectBtn').addEventListener('click', toggleNewProjectForm);

// Evento para enviar el formulario de nuevo proyecto
document.addEventListener('DOMContentLoaded', () => {
    // Cargar proyectos al iniciar
    loadProjects();
});
// Función para cargar proyectos desde la API
function loadProjects() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            projects = data; // Guardar proyectos en el array
            displayProjects(); // Mostrar proyectos en la tabla
        })
        .catch(error => console.error('Error al cargar proyectos:', error));
}

// Función para mostrar los proyectos en la tabla
function displayProjects() {
    const projectsTableBody = document.querySelector('#projectsTable tbody');
    projectsTableBody.innerHTML = ''; // Limpiar la tabla

    projects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.title}</td>
            <td>${project.description}</td>
            <td><span class="status ${project.status}">${project.status === 'completed' ? 'Completado' : 'En curso'}</span></td>
            <td>${project.owners.join(', ')}</td>
            <td>Inicio: ${project.startDate}<br>Fin: ${project.endDate}</td>
            <td>
                <button onclick="viewProjectDetails('project-details.html?id=${project.id}')">Ver Detalles</button>
                <button onclick="editProject(${index})">Editar</button>
                <button onclick="deleteProject(${index})">Eliminar</button>
            </td>
        `;
        projectsTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Tu mensaje aquí';
    
    ChatBox.appendChild(messageDiv);
});


// Función para mostrar/ocultar el formulario para crear un nuevo proyecto
function toggleNewProjectForm() {
    const form = document.getElementById('newProjectForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

// Función para crear un nuevo proyecto
function createNewProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const ownerId = document.getElementById('projectOwnerId').value;

    // Validar que los campos no estén vacíos
    if (!title || !description || !ownerId) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (title.length < 3) {
        alert('El título debe tener al menos 3 caracteres.');
        return;
    }

    const submitButton = document.getElementById('createProjectBtn');
    submitButton.disabled = true;

    fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            owner_id: ownerId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del proyecto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Proyecto creado:', data);
        loadProjects(); // Recargar la lista de proyectos

        // Mostrar mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block'; // Mostrar el mensaje
        setTimeout(() => {
            successMessage.style.display = 'none'; // Ocultar el mensaje después de 3 segundos
        }, 3000);
        
        // Limpiar el formulario
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectOwnerId').value = '';
        toggleNewProjectForm(); // Ocultar el formulario después de crear el proyecto
    })
    .catch(error => {
        console.error('Error al crear el proyecto:', error);
        alert('No se pudo crear el proyecto. Intenta de nuevo más tarde.');
    })
    .finally(() => {
        submitButton.disabled = false; // Habilitar el botón nuevamente
    });
}

// Función para filtrar proyectos según la entrada del usuario
function filterProjects() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableRows = document.querySelectorAll('#projectsTable tbody tr');

    tableRows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const description = row.cells[1].textContent.toLowerCase();
        
        if (title.includes(searchInput) || description.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Función para editar un proyecto
function editProject(index) {
    const project = projects[index];
    document.getElementById('editProjectTitle').value = project.title;
    document.getElementById('editProjectDescription').value = project.description;
    document.getElementById('editProjectOwnerId').value = project.owners.join(', ');
    document.getElementById('editProjectForm').style.display = 'block';
    document.getElementById('updateProjectBtn').setAttribute('data-index', index);
}

// Función para actualizar el proyecto
function updateProject() {
    const index = document.getElementById('updateProjectBtn').getAttribute('data-index');
    projects[index].title = document.getElementById('editProjectTitle').value;
    projects[index].description = document.getElementById('editProjectDescription').value;
    projects[index].owners = document.getElementById('editProjectOwnerId').value.split(',').map(owner => owner.trim());
    
    fetch('/api/projects/${projects[index].id}', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projects[index])
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el proyecto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Proyecto actualizado:', data);
        loadProjects(); // Recargar la lista de proyectos
        document.getElementById('editProjectForm').style.display = 'none'; // Ocultar el formulario
    })
    .catch(error => {
        console.error('Error al actualizar el proyecto:', error);
        alert('No se pudo actualizar el proyecto. Intenta de nuevo más tarde.');
    });
}

// Función para eliminar un proyecto
function deleteProject(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
        fetch('/api/projects/${projects[index].id}', {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el proyecto');
            }
            loadProjects(); // Recargar la lista de proyectos
        })
        .catch(error => {
            console.error('Error al eliminar el proyecto:', error);
            alert('No se pudo eliminar el proyecto. Intenta de nuevo más tarde.');
        });
    }
}

// Función para agregar un nuevo miembro al equipo
function addMember() {
    const name = document.getElementById('memberName').value.trim();
    const email = document.getElementById('memberEmail').value.trim();
    const role = document.getElementById('memberRole').value;

    // Validar que los campos no estén vacíos
    if (!name || !email) {
        showNotification('Por favor, completa todos los campos.');
        return;
    }

    // Agregar el nuevo miembro al array
    const newMember = { name, email, role };
    teamMembers.push(newMember);
    displayTeamMembers(); // Actualizar la tabla de miembros

    // Limpiar los campos
    document.getElementById('memberName').value = '';
    document.getElementById('memberEmail').value = '';
    document.getElementById('memberRole').value = 'developer'; // Reiniciar a "Desarrollador"

    showNotification('Miembro agregado con éxito.');
}

// Función para mostrar los miembros del equipo en la tabla
function displayTeamMembers() {
    const teamMembersTableBody = document.querySelector('#teamMembersTable tbody');
    teamMembersTableBody.innerHTML = ''; // Limpiar la tabla

    teamMembers.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.role}</td>
            <td>
                <button onclick="editMember(${index})">Editar</button>
                <button onclick="removeMember(${index})">Eliminar</button>
            </td>
        `;
        teamMembersTableBody.appendChild(row);
    });
}
// Función para agregar un miembro del equipo
function addMember() {
    const memberName = memberNameInput.value.trim();
    const memberEmail = memberEmailInput.value.trim();
    const memberRole = memberRoleSelect.value;

    if (memberName && memberEmail) {
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = memberName;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = memberEmail;
        newRow.appendChild(emailCell);

        const roleCell = document.createElement('td');
        roleCell.textContent = memberRole;
        newRow.appendChild(roleCell);

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            newRow.remove();
            showNotification('Miembro eliminado');
        });
        actionsCell.appendChild(deleteButton);
        newRow.appendChild(actionsCell);

        teamMembersTable.getElementsByTagName('tbody')[0].appendChild(newRow);

        memberNameInput.value = '';
        memberEmailInput.value = '';
        memberRoleSelect.value = 'developer';

        showNotification('Miembro agregado');
    } else {
        showNotification('Por favor, completa todos los campos', true);
    }
}

// Función para mostrar una notificación
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.toggle('error', isError);

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Agregar evento al botón de agregar miembro
addMemberButton.addEventListener('click', addMember);

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Función para editar un miembro
function editMember(index) {
    const member = teamMembers[index];
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberRole').value = member.role;
    // Aquí puedes agregar lógica para actualizar el miembro en el array
}

// Función para eliminar un miembro
function removeMember(index) {
    teamMembers.splice(index, 1); // Eliminar del array
    displayTeamMembers(); // Actualizar la tabla
    showNotification('Miembro eliminado con éxito.');
}
// Lógica para manejar el calendario y las tareas
const calendarBody = document.querySelector('.calendar-body');
const tasksContainer = document.querySelector('.tasks');
const newTaskInput = document.querySelector('.new-task');
const addTaskButton = document.querySelector('.add-task');
const searchInput = document.querySelector('.search-bar');
const taskPrioritySelect = document.querySelector('.task-priority');

// Funciones para manejar el calendario
function renderCalendar(year, month) {
    // Lógica para renderizar el calendario
}
// Progresos

// Funciones para manejar el progreso del proyecto
function updateProgressPercentage() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = (completedTasks / totalTasks) * 100 || 0;
    document.querySelector('.progress-percentage').textContent = '${progressPercentage.toFixed(2)}%';
}
// Funciones para registrar las actividades
function logActivity(message) {
    activityLog.push(message)
    saveActivityLog();
    renderActivityLog();
}

function renderTasks() {
    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.innerHTML = ''; // Limpiar la lista de tareas

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        taskItem.className = task.completed ? 'completed' : '';

        // Checkbox para marcar como completada
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
            updateProgressPercentage();
            logActivity(`Tarea "${task.text}" marcada como ${task.completed ? 'completada' : 'incompleta'}.`);
        });

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            updateProgressPercentage();
            logActivity('Tarea "${task.text}" eliminada.');
        });

        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edita la tarea:', task.text);
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
                logActivity('Tarea "${task.text}" editada.');
            }
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        tasksContainer.appendChild(taskItem);
    });
}

function renderTimelineEvents() {
    const timelineContainer = document.querySelector('.timeline-events');
    timelineContainer.innerHTML = ''; // Limpiar la lista de eventos

    timelineEvents.forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.textContent = event;
        timelineContainer.appendChild(eventItem);
    });
}

function logActivity(message) {
    activityLog.push(message);
    saveActivityLog();
    renderActivityLog();
}

function renderActivityLog() {
    const logContainer = document.querySelector('.log');
    logContainer.innerHTML = ''; // Limpiar el registro de actividades

    activityLog.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.textContent = activity;
        logContainer.appendChild(activityItem);
    });
}

// Funciones de guardado y carga
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTimelineEvents() {
    localStorage.setItem('timelineEvents', JSON.stringify(timelineEvents));
}

function saveActivityLog() {
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
}

// Agregar tarea
document.querySelector('.add-task').addEventListener('click', () => {
    const taskText = prompt('Ingrese el texto de la nueva tarea:');
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        updateProgressPercentage();
        logActivity('Nueva tarea "${taskText}" agregada.');
    }
});
// Login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Aquí deberías agregar la lógica para verificar las credenciales
    // Esto es solo un ejemplo de validación
    if (username === "usuario" && password === "contraseña") {
        // Redirigir al perfil o mostrar un mensaje de éxito
        window.location.href = 'erfil.html'; // Cambia esto a la URL de tu perfil
    } else {
        document.getElementById('loginMessage').textContent = 'Credenciales incorrectas. Intenta de nuevo.';
        document.getElementById('loginMessage').style.display = 'block';
    }
});
// script.js

document.getElementById('editPerfilBtn').addEventListener('click', function() {
    // Mostrar el formulario de edición
    document.getElementById('editPerfilForm').style.display = 'block';
    // Rellenar el formulario con los datos actuales
    document.getElementById('editUserName').value = document.getElementById('userName').textContent;
    document.getElementById('editUserEmail').value = document.getElementById('userEmail').textContent;
    document.getElementById('editUserRole').value = document.getElementById('userRole').textContent.toLowerCase();
});

document.getElementById('perfilForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los nuevos valores
    const newName = document.getElementById('editUserName').value;
    const newEmail = document.getElementById('editUserEmail').value;
    const newRole = document.getElementById('editUserRole').value;

    // Actualizar la información del perfil
    document.getElementById('userName').textContent = newName;
    document.getElementById('userEmail').textContent = newEmail;
    document.getElementById('userRole').textContent = newRole;

    // Ocultar el formulario de edición
    document.getElementById('editPerfilForm').style.display = 'none';
});
// script.js

// Obtener referencia al formulario
const createProjectForm = document.getElementById('createProjectForm');

// Agregar un evento de envío al formulario
createProjectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores del formulario
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;

    // Obtener la lista de colaboradores
    const collaboratorList = document.getElementById('collaboratorList');
    const collaborators = [];
    for (let i = 0; i < collaboratorList.children.length; i++) {
        collaborators.push(collaboratorList.children[i].textContent);
    }

    // Aquí puedes agregar la lógica para enviar los datos del proyecto al servidor
    // o guardarlos en una base de datos local

    // Por ejemplo, puedes mostrar un mensaje de éxito
    alert('Proyecto creado exitosamente');

    // Limpiar el formulario
    createProjectForm.reset();
});

// Función para agregar colaboradores
function addCollaborator() {
    const collaboratorInput = document.getElementById('collaborators');
    const collaboratorEmail = collaboratorInput.value.trim();

    if (collaboratorEmail) {
        const collaboratorItem = document.createElement('li');
        collaboratorItem.textContent = collaboratorEmail;
        document.getElementById('collaboratorList').appendChild(collaboratorItem);
        collaboratorInput.value = '';
    }
}
// script.js

createProjectForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores del formulario
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;

    // Obtener la lista de colaboradores
    const collaboratorList = document.getElementById('collaboratorList');
    const collaborators = [];
    for (let i = 0; i < collaboratorList.children.length; i++) {
        collaborators.push(collaboratorList.children[i].textContent);
    }

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName,
                projectDescription,
                startDate,
                endDate,
                budget,
                status,
                collaborators
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Mostrar mensaje de éxito
            createProjectForm.reset(); // Limpiar el formulario
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al crear el proyecto');
    }
});
// script.js

// Datos de ejemplo de las tareas
const task = [
    { id: 1, name: 'Tarea 1', status: 'completada', dueDate: '2024-08-15' },
    { id: 2, name: 'Tarea 2', status: 'en progreso', dueDate: '2024-08-20' },
    { id: 3, name: 'Tarea 3', status: 'pendiente', dueDate: '2024-08-25' }
];

// Función para renderizar la lista de tareas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - ${task.status} (${task.dueDate})`;
        taskList.appendChild(taskItem);
    });
    updateProgress();
}

// Función para actualizar el progreso del proyecto
function updateProgress() {
    const completedTasks = tasks.filter(task => task.status === 'completada').length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    progressPercentage.textContent = `${progress.toFixed(2)}%`;
}

// Función para agregar una nueva tarea
function addTask() {
    const newTaskName = prompt('Ingresa el nombre de la nueva tarea:');
    if (newTaskName) {
        const newTask = {
            id: tasks.length + 1,
            name: newTaskName,
            status: 'pendiente',
            dueDate: '2024-08-30'
        };
        tasks.push(newTask);
        renderTasks();
        logActivity(`Nueva tarea agregada: ${newTaskName}`);
    }
}

// Función para buscar tareas
function searchTasks() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm)
    );
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - ${task.status} (${task.dueDate})`;
        taskList.appendChild(taskItem);
    });
}

// Función para registrar actividades
function logActivity(message) {
    const activityItem = document.createElement('li');
    activityItem.textContent = message;
    activityLog.appendChild(activityItem);
}
// Inicializar el gráfico de progreso
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Tarea 1', 'Tarea 2', 'Tarea 3'],
        datasets: [{
            label: 'Progreso de Tareas',
            data: [100, 60, 30], // Porcentajes de progreso de cada tarea
            backgroundColor: 'rgba(76, 175, 80, 0.6)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // Máximo 100%
            }
        }
    }
});

// Eventos
searchBar.addEventListener('input', searchTasks);
addTaskButton.addEventListener('click', addTask);

// Renderizar las tareas iniciales
renderTasks();

// Inicializar la aplicación
renderTasks();
updateProgressPercentage();
renderTimelineEvents();
renderActivityLog();