<template>
  <v-container>
    <v-card>
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.title"
        label="Task title"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.dueDate"
        label="Due Date"
        type="date"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.assignee"
        label="Assignee"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.description"
        label="Description"
      />

      <v-card-action>
        <div>
          <v-btn @click="closeDialog" class="ma-2 pa-1">Cancel</v-btn>
          <v-btn @click="createTask" class="ma-2 pa-1">Create</v-btn>
        </div>
      </v-card-action>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/newTask";

const taskStore = useTaskStore();

const title = ref("");
const dueDate = ref("");
const assignee = ref("");
const description = ref("");
const taskData = ref({});
// const emit = defineEmits(["transferTaskDataToTaskDraft", "close-dialog"]);

// function createTask() {
//   const taskData = {
//     taskTitle: title.value,
//     dueDate: dueDate.value,
//     assignee: assignee.value,
//     description: description.value,
//   };
//   emit("transferTaskDataToTaskDraft", taskData);
//   emit("close-dialog");
//   // console.log(taskData);
// }

function createTask() {
  const taskData = taskStore.getTaskData();
  // emit("transferTaskDataToTaskDraft", taskData);
  // emit("close-dialog");
  console.log(taskData);
}

// function closeDialog() {
//   emit("close-dialog");
//   console.log("dialog closed");
// }

function closeDialog() {
  // Optional: clear fields when closing dialog
  taskStore.clearAllFields();
  // emit("close-dialog");
  console.log("dialog closed");
}
</script>
