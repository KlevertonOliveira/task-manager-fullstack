export function createTask({_id: taskID, description, completed}){
  
  return (
    `<div class='task-wrapper' data-id=${taskID}>
        <div class='task-header'>
          <div class='w-4'>
            <div class='${completed ? '' : 'hidden'}' id='checkmark'>
              <i class="fas fa-check"></i>
            </div>
          </div>
          <h5 class='task-description ${completed ? 'task-completed' : ''}'>
            ${description}
          </h5>
        </div>
        <div class='task-buttons'>
          <a href='task.html?id=${taskID}' title='Edit Task' class='task-buttons__edit-btn'>
            <i class="fas fa-edit"></i>
          </a>
          <button title='Remove Task' class='task-buttons__remove-btn'>
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `
  )
}