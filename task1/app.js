document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const editTaskForm = document.getElementById('edit-task-form');
    const taskList = document.getElementById('task-list');
    const categorySelect = document.getElementById('category-select');
    const prioritySelect = document.getElementById('priority-select');
    const cancelEditBtn = document.getElementById('cancel-edit');
  
    let tasks = loadTasks();
    let currentEditTaskId = null;
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title').value;
      const description = document.getElementById('task-description').value;
  
      addTask({ title, description });
      taskForm.reset();
      renderTasks();
    });
  
    editTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('edit-task-title').value;
      const description = document.getElementById('edit-task-description').value;
  
      updateTask({ id: currentEditTaskId, title, description });
      editTaskForm.reset();
      hideEditForm();
      renderTasks();
    });
  
    cancelEditBtn.addEventListener('click', () => {
      hideEditForm();
    });
  
    categorySelect.addEventListener('change', renderTasks);
    prioritySelect.addEventListener('change', renderTasks);
  
    function addTask(task) {
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        completed: false,
        category: categorySelect.value,
        priority: prioritySelect.value,
        dueDate: null,
      };
      tasks.push(newTask);
      saveTasks();
    }
  
    function updateTask(updatedTask) {
      tasks = tasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      saveTasks();
    }
  
    function toggleTaskCompletion(id) {
      tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasks();
      renderTasks();
    }
  
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      saveTasks();
      renderTasks();
    }
  
    function editTask(id) {
      const task = tasks.find(task => task.id === id);
      document.getElementById('edit-task-title').value = task.title;
      document.getElementById('edit-task-description').value = task.description;
      currentEditTaskId = id;
      showEditForm();
    }
  
    function showEditForm() {
      editTaskForm.classList.remove('hidden');
      taskForm.classList.add('hidden');
    }
  
    function hideEditForm() {
      editTaskForm.classList.add('hidden');
      taskForm.classList.remove('hidden');
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => {
        if (categorySelect.value && task.category !== categorySelect.value) return false;
        if (prioritySelect.value && task.priority !== prioritySelect.value) return false;
        return true;
      });
  
      filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button onclick="toggleTaskCompletion(${task.id})">Toggle Complete</button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
          </div>
        `;
        taskList.appendChild(taskElement);
      });
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }
  
    window.toggleTaskCompletion = toggleTaskCompletion;
    window.deleteTask = deleteTask;
    window.editTask = editTask;
  
    renderTasks();
  });
  