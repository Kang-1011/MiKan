// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useTaskStore = defineStore("task", () => {
//   // State
//   const title = ref("");
//   const dueDate = ref("");
//   const assignee = ref("");
//   const description = ref("");

//   // Actions
//   function updateTitle(newTitle: string) {
//     title.value = newTitle;
//   }

//   function updateDueDate(newDueDate: string) {
//     dueDate.value = newDueDate;
//   }

//   function updateAssignee(newAssignee: string) {
//     assignee.value = newAssignee;
//   }

//   function updateDescription(newDescription: string) {
//     description.value = newDescription;
//   }

//   function clearAllFields() {
//     title.value = "";
//     dueDate.value = "";
//     assignee.value = "";
//     description.value = "";
//   }

//   function getTaskData() {
//     return {
//       taskTitle: title.value,
//       dueDate: dueDate.value,
//       assignee: assignee.value,
//       description: description.value,
//     };
//   }

//   return {
//     // State
//     title,
//     dueDate,
//     assignee,
//     description,
//     // Actions
//     updateTitle,
//     updateDueDate,
//     updateAssignee,
//     updateDescription,
//     clearAllFields,
//     getTaskData,
//   };
// });

// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useTaskStore = defineStore("task", () => {
//   // Array to store multiple tasks
//   //   const tasks = ref([]);
//   const tasks = ref<Task[]>([]);

//   // Current form data (for the form being filled)
//   const currentTask = ref({
//     id: null,
//     title: "",
//     dueDate: "",
//     assignee: "",
//     description: "",
//   });

//   // Actions
//   function updateCurrentTask(field, value) {
//     currentTask.value[field] = value;
//   }

//   function clearCurrentTask() {
//     currentTask.value = {
//       id: null,
//       title: "",
//       dueDate: "",
//       assignee: "",
//       description: "",
//     };
//   }

//   function createNewTask() {
//     // Create a new task with unique ID
//     const newTask = {
//       id: Date.now(), // Simple ID generation
//       taskTitle: currentTask.value.title,
//       dueDate: currentTask.value.dueDate,
//       assignee: currentTask.value.assignee,
//       description: currentTask.value.description,
//       createdAt: new Date(),
//     };

//     // Add to tasks array
//     tasks.value.push(newTask);

//     // Clear current form
//     clearCurrentTask();

//     return newTask;
//   }

//   function deleteTask(taskId) {
//     const index = tasks.value.findIndex((task) => task.id === taskId);
//     if (index > -1) {
//       tasks.value.splice(index, 1);
//     }
//   }

//   function getCurrentTaskData() {
//     return {
//       taskTitle: currentTask.value.title,
//       dueDate: currentTask.value.dueDate,
//       assignee: currentTask.value.assignee,
//       description: currentTask.value.description,
//     };
//   }

//   return {
//     // State
//     tasks,
//     currentTask,
//     // Actions
//     updateCurrentTask,
//     clearCurrentTask,
//     createNewTask,
//     deleteTask,
//     getCurrentTaskData,
//   };
// });

import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
  // Array to store multiple tasks
  const tasks = ref([]);

  // Current form data (for the form being filled)
  const currentTask = ref({
    id: null,
    title: "",
    dueDate: "",
    assignee: "",
    description: "",
  });

  // Actions
  function updateCurrentTask(field, value) {
    currentTask.value[field] = value;
  }

  function clearCurrentTask() {
    currentTask.value = {
      id: null,
      title: "",
      dueDate: "",
      assignee: "",
      description: "",
    };
  }

  function createNewTask() {
    // Create a new task with unique ID
    const newTask = {
      id: Date.now(), // Simple ID generation
      taskTitle: currentTask.value.title,
      dueDate: currentTask.value.dueDate,
      assignee: currentTask.value.assignee,
      description: currentTask.value.description,
      createdAt: new Date(),
    };

    // Add to tasks array
    tasks.value.push(newTask);

    // Clear current form
    clearCurrentTask();

    return newTask;
  }

  function deleteTask(taskId) {
    const index = tasks.value.findIndex((task) => task.id === taskId);
    if (index > -1) {
      tasks.value.splice(index, 1);
    }
  }

  function getCurrentTaskData() {
    return {
      taskTitle: currentTask.value.title,
      dueDate: currentTask.value.dueDate,
      assignee: currentTask.value.assignee,
      description: currentTask.value.description,
    };
  }

  return {
    // State
    tasks,
    currentTask,
    // Actions
    updateCurrentTask,
    clearCurrentTask,
    createNewTask,
    deleteTask,
    getCurrentTaskData,
  };
});
