const formDOM = document.getElementById('form-dom');
const taskID = document.getElementById('task-id');
const taskDescription = document.getElementById('task-description');
const taskCompleted = document.getElementById('task-completed'); 
const errorMsgAlert = document.getElementById('error-msg');
const updateTaskButton = document.getElementById('update-task-btn');
const inputErrorAlert = document.getElementById('input-error-alert');
const updateTaskSuccess = document.getElementById('update-task-success');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

let currentTaskDescription, currentTaskCompletedStatus;

// fetch task data based on id
const showTask = async() => {
  try {
    const {data} = await axios.get(`/api/v1/tasks/${id}`);
    const {_id: taskId, completed, description } = data.data;
    currentTaskCompletedStatus = completed;
    currentTaskDescription = description;

    taskID.textContent = taskId;
    taskDescription.value = description;

    if(completed){
      taskCompleted.checked = true;
    }
  } 
  catch (error) {
    errorMsgAlert.classList.remove('hidden');
  }
}

showTask();

formDOM.addEventListener('submit', async(e)=>{
  e.preventDefault();
  if((currentTaskDescription === taskDescription.value) && (currentTaskCompletedStatus === taskCompleted.checked)){
    inputErrorAlert.classList.remove('hidden');
    inputErrorAlert.textContent = 'No changes made.';
    setTimeout(()=>{
      inputErrorAlert.classList.add('hidden');
    }, 2000)
  }
  else{
    try {
      await axios.patch(`/api/v1/tasks/${id}`, {
        description: taskDescription.value,
        completed: taskCompleted.checked
      })
      updateTaskSuccess.classList.remove('hidden');
      updateTaskButton.disabled = true;
      setTimeout(()=>{
        updateTaskSuccess.classList.add('hidden');
        window.location.replace('index.html');
      }, 2000)
    } 
    catch (error) {
      inputErrorAlert.classList.remove('hidden');
      inputErrorAlert.textContent = 'Something went wrong.';
    }
  }
})