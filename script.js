/* TASK PAGE*/



/* js for tasks */
const addTaskButton = document.getElementById('add-task-arrow');
const deskTaskInput = document.getElementById('input');
const myTasks = document.querySelector('.tasks');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
            <div class="todo-item ${task.completed ? 'checked' : ''}">
                <input type="checkbox"
                        class="buttoon-complete"
                        onclick = "completeTask(${index})"
                        ${task.completed ? 'checked' : ''}/>
                <div class="description">
                    ${task.description}   
                </div>
                <button class="button-delete" onclick = "completeTask(${index})">
                    delete
                </button>
            </div>
    `
}

const fillHtmlList = () => {
    myTasks.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            myTasks.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskButton.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})


const deleteTask = index => {
    console.log(index);
}
/* js for timer */

const startCountingDown = 25;
const startTimerbutton = document.getElementById("button-for-timer");
startTimerbutton.onclick = startTimer;

function startTimer() {
    console.log("work");
    setInterval(updateCountdown, 1000);
}
        
let time = startCountingDown * 60 ;

const countdownEl = document.getElementById('countdown');

function updateCountdown() {
    if (time === 0) {
        clearInterval();
        return;
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds === 0) {
        minutes--;
        seconds = 59;
    }
    else {
        seconds--;
    }
    time = minutes * 60 + seconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
}

/* js for music */
const musicContainer = document.querySelector('.for-music');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');