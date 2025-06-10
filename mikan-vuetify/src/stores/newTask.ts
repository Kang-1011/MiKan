import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
  // State
  const title = ref("");
  const dueDate = ref("");
  const assignee = ref("");
  const description = ref("");

  // Actions
  function updateTitle(newTitle: string) {
    title.value = newTitle;
  }

  function updateDueDate(newDueDate: string) {
    dueDate.value = newDueDate;
  }

  function updateAssignee(newAssignee: string) {
    assignee.value = newAssignee;
  }

  function updateDescription(newDescription: string) {
    description.value = newDescription;
  }

  function clearAllFields() {
    title.value = "";
    dueDate.value = "";
    assignee.value = "";
    description.value = "";
  }

  function getTaskData() {
    return {
      taskTitle: title.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
      description: description.value,
    };
  }

  return {
    // State
    title,
    dueDate,
    assignee,
    description,
    // Actions
    updateTitle,
    updateDueDate,
    updateAssignee,
    updateDescription,
    clearAllFields,
    getTaskData,
  };
});
