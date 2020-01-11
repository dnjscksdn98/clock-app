const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];  // to-do list

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);  // remove the li that was clicked

    const cleanToDos = toDos.filter(function (toDo) {  // return to-dos except the clicked one
        return toDo.id !== parseInt(li.id);  // changes the string to a number
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // changes every object into json type string, and save to localStorage
}

function paintToDo(text) {
    const li = document.createElement("li");  // create a li element
    const delBtn = document.createElement("button");  // crate a button element
    const span = document.createElement("span");  // create a span element
    const newId = toDos.length + 1;  // toDos id

    delBtn.innerText = '❌';
    delBtn.addEventListener('click', deleteToDo);  // if button clicked, delete to-do
    span.innerText = text;

    li.appendChild(delBtn);  // add element into li
    li.appendChild(span);
    li.id = newId;  // add the newId to li element
    toDoList.appendChild(li);  // add element into toDoList(ul)

    const toDoObj = {  // to-do object
        text: text,
        id: newId,
    };

    toDos.push(toDoObj);  // add to to-do list
    saveToDos();  // save to localStorage
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;  // return the input text
    paintToDo(currentValue);  // print text
    toDoInput.value = "";  // turn back to empty input
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {  // if I have to-dos, print them
        const parsedToDos = JSON.parse(loadedToDos);  // changes every json type strings to objects

        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);  // if submit call handleSubmit
}
init();