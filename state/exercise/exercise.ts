enum TASK_STATES {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  INPROGRESS = "IN_PROGRESS",
  INREVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

class Task {
  private _state: TASK_STATES;
  private _name: string;

  constructor(name: string, state: TASK_STATES = TASK_STATES.BACKLOG) {
    this._name = name;
    this._state = state;
  }

  getState(): TASK_STATES {
    return this._state;
  }

  getName(): string {
    return this._name;
  }
}

interface TaskState {
  moveToBacklog(): void;
  moveToTodo(): void;
  moveToInProgress(): void;
  moveToInReview(): void;
  moveToDone(): void;
  moveToBlocked(): void;
  getState(): TASK_STATES;
}

class BacklogState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Task is already in Backlog state.");
  }

  moveToTodo(): void {
    console.log("Moving task to TODO state.");
    this.taskManager.changeState(new TodoState(this.taskManager));
  }

  moveToInProgress(): void {
    console.log("Cannot move task to IN_PROGRESS from BACKLOG state.");
  }

  moveToInReview(): void {
    console.log("Cannot move task to IN_REVIEW from BACKLOG state.");
  }

  moveToDone(): void {
    console.log("Cannot move task to DONE from BACKLOG state.");
  }

  moveToBlocked(): void {
    console.log("Cannot move task to BLOCKED from BACKLOG state.");
  }

  getState(): TASK_STATES {
    return TASK_STATES.BACKLOG;
  }
}

class TodoState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Moving task to BACKLOG state.");
    this.taskManager.changeState(new BacklogState(this.taskManager));
  }

  moveToTodo(): void {
    console.log("Task is already in TODO state.");
  }

  moveToInProgress(): void {
    console.log("Moving task to IN_PROGRESS state.");
    this.taskManager.changeState(new InProgressState(this.taskManager));
  }

  moveToInReview(): void {
    console.log("Cannot move task to IN_REVIEW from TODO state.");
  }

  moveToDone(): void {
    console.log("Cannot move task to DONE from TODO state.");
  }

  moveToBlocked(): void {
    console.log("Moving task to BLOCKED state.");
    this.taskManager.changeState(new BlockedState(this.taskManager));
  }

  getState(): TASK_STATES {
    return TASK_STATES.TODO;
  }
}

class InProgressState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Moving task to BACKLOG state.");
    this.taskManager.changeState(new BacklogState(this.taskManager));
  }

  moveToTodo(): void {
    console.log("Moving task to TODO state.");
    this.taskManager.changeState(new TodoState(this.taskManager));
  }

  moveToInProgress(): void {
    console.log("Task is already in IN_PROGRESS state.");
  }

  moveToInReview(): void {
    console.log("Moving task to IN_REVIEW state.");
    this.taskManager.changeState(new InReviewState(this.taskManager));
  }

  moveToDone(): void {
    console.log("Cannot move task to DONE from IN_PROGRESS state.");
  }

  moveToBlocked(): void {
    console.log("Moving task to BLOCKED state.");
    this.taskManager.changeState(new BlockedState(this.taskManager));
  }

  getState(): TASK_STATES {
    return TASK_STATES.INPROGRESS;
  }
}

class InReviewState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Moving task to BACKLOG state.");
    this.taskManager.changeState(new BacklogState(this.taskManager));
  }

  moveToTodo(): void {
    console.log("Moving task to TODO state.");
    this.taskManager.changeState(new TodoState(this.taskManager));
  }

  moveToInProgress(): void {
    console.log("Moving task to IN_PROGRESS state.");
    this.taskManager.changeState(new InProgressState(this.taskManager));
  }

  moveToInReview(): void {
    console.log("Task is already in IN_REVIEW state.");
  }

  moveToDone(): void {
    console.log("Moving task to DONE state.");
    this.taskManager.changeState(new DoneState(this.taskManager));
  }

  moveToBlocked(): void {
    console.log("Moving task to BLOCKED state.");
    this.taskManager.changeState(new BlockedState(this.taskManager));
  }

  getState(): TASK_STATES {
    return TASK_STATES.INREVIEW;
  }
}

class DoneState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Moving task to BACKLOG state.");
    this.taskManager.changeState(new BacklogState(this.taskManager));
  }

  moveToTodo(): void {
    console.log("Moving task to TODO state.");
    this.taskManager.changeState(new TodoState(this.taskManager));
  }

  moveToInProgress(): void {
    console.log("Moving task to IN_PROGRESS state.");
    this.taskManager.changeState(new InProgressState(this.taskManager));
  }

  moveToInReview(): void {
    console.log("Moving task to IN_REVIEW state.");
    this.taskManager.changeState(new InReviewState(this.taskManager));
  }

  moveToDone(): void {
    console.log("Task is already in DONE state.");
  }

  moveToBlocked(): void {
    console.log("Cannot move task to BLOCKED from DONE state.");
  }

  getState(): TASK_STATES {
    return TASK_STATES.DONE;
  }
}

class BlockedState implements TaskState {
  constructor(private taskManager: TaskManager) {}

  moveToBacklog(): void {
    console.log("Moving task to BACKLOG state.");
    this.taskManager.changeState(new BacklogState(this.taskManager));
  }

  moveToTodo(): void {
    console.log("Moving task to TODO state.");
    this.taskManager.changeState(new TodoState(this.taskManager));
  }

  moveToInProgress(): void {
    console.log("Moving task to IN_PROGRESS state.");
    this.taskManager.changeState(new InProgressState(this.taskManager));
  }

  moveToInReview(): void {
    console.log("Moving task to IN_REVIEW state.");
    this.taskManager.changeState(new InReviewState(this.taskManager));
  }

  moveToDone(): void {
    console.log("Cannot move task to DONE from BLOCKED state.");
  }

  moveToBlocked(): void {
    console.log("Task is already in BLOCKED state.");
  }

  getState(): TASK_STATES {
    return TASK_STATES.BLOCKED;
  }
}

class TaskManager {
  private task: Task;
  private taskState: TaskState;

  constructor(task: Task) {
    this.task = task;
    this.taskState = new BacklogState(this);
  }

  getTask(): Task {
    return this.task;
  }

  changeState(newState: TaskState): void {
    this.taskState = newState;
  }

  markTaskAsBacklog(): void {
    this.taskState.moveToBacklog();
  }

  markTaskAsTodo(): void {
    this.taskState.moveToTodo();
  }

  markTaskAsInProgress(): void {
    this.taskState.moveToInProgress();
  }

  markTaskAsInReview(): void {
    this.taskState.moveToInReview();
  }

  markTaskAsDone(): void {
    this.taskState.moveToDone();
  }

  markTaskAsBlocked(): void {
    this.taskState.moveToBlocked();
  }

  getCurrentState(): TASK_STATES {
    return this.taskState.getState();
  }
}

// Example usage
const task = new Task("Implement State Pattern");
const taskManager = new TaskManager(task);

console.log(
  `Task '${task.getName()}' initial state: ${taskManager.getCurrentState()}`
);

taskManager.markTaskAsTodo();
console.log(`Current state: ${taskManager.getCurrentState()}`);

taskManager.markTaskAsInProgress();
console.log(`Current state: ${taskManager.getCurrentState()}`);

taskManager.markTaskAsInReview();
console.log(`Current state: ${taskManager.getCurrentState()}`);

taskManager.markTaskAsDone();
console.log(`Current state: ${taskManager.getCurrentState()}`);

// Try an invalid transition
taskManager.markTaskAsBlocked();
console.log(`Current state: ${taskManager.getCurrentState()}`);
