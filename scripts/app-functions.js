'user strict';

const getSavedTodos = () => {
    'use strict';
    try {
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    } catch (e) {
        return [];
    }
};

const removeTodo = (id) => {
    'use strict';
    const todoIndex = todos.findIndex(todo => todo.id === id);

    todoIndex > -1 ? todos.splice(todoIndex, 1) : null;

}

const saveTodos = todo => localStorage.setItem('todos', JSON.stringify(todo));

const toggleTodo = id => {
    const todo = todos.find(todo => todo.id === id);

    todo ? todo.completed = !todo.completed : null;
}

const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos');
    const filteredTodos = todos.filter(todo => {
        const filterTodo = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        return filterTodo && (!filters.hideCompleted || !todo.completed);
    });
    const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    console.log(filteredTodos.length);
    if(filteredTodos.length <= 0) {
        const msgEl = document.createElement('p');
        msgEl.classList.add('empty-message');
        msgEl.textContent = `You don\'t have any todos`;
        todoEl.appendChild(msgEl);
    }

    filteredTodos.forEach(todo => {
        const p = generateTodoDOM(todo);
        todoEl.appendChild(p);
    });
};

const generateTodoDOM = todo => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkboxTodo = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    checkboxTodo.setAttribute('type', 'checkbox');
    checkboxTodo.checked = todo.completed;
    containerEl.appendChild(checkboxTodo);
    checkboxTodo.addEventListener('change', e => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);

    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', e => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    return todoEl
};

const generateSummaryDOM = incompleteTodos => {
    const total = document.createElement('h2');
    total.classList.add('list-title');
    incompleteTodos.length === 1 ?
    total.textContent = `You have one todo left` : 
    total.textContent = `You have ${incompleteTodos.length} todos left`;
    return total
}