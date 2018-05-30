// Setup the empty todos array

// loadTodos
// Arguments: none
// Return value: none

// saveTodos
// Arguments: none
// Return value: none

// getTodos
// Arguments: none
// Return value: todos array

// createTodo
// Arguments: todo text
// Return value: none

// removeTodo
// Arguments: id of todo to remove
// Return value: none

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none

// Make sure to call loadTodos and setup the exports
import uuidv4 from 'uuidv4';

let todos = [];

const loadTodos = () => {
    todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
};

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = (text) => {
    text = text.trim();
    if(text.length > 0) {
        const newTodo = {
            id: uuidv4(), 
            text, 
            completed: false 
    };
    todos.push(newTodo);
    saveTodos();
    }
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);

    todoIndex > -1 ? todos.splice(todoIndex, 1) : null;
    saveTodos();
}

const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);

    todo ? todo.completed = !todo.completed : null;
    saveTodos();
}

loadTodos();

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo }