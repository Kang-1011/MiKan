<template>
  <Sidebar />
  <button @click="createNewTaskDraft">Create New Task Draft</button>
  <ManagerReviewNavbar />

  <v-row>
    <v-col>
      <!-- <TaskDraft
        :task-data="item"
        :task-index="index"
        @delete-task="deleteTask"
      ></TaskDraft> -->
      <TaskDraft />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useTaskStore } from "@/stores/newTask";
const search = ref("");
const darkMode = ref(false);
const theme = useTheme();
const isDark = ref(theme.global.name.value === "dark");
theme.global.name.value = darkMode.value ? "dark" : "light";
const create = ref(false);

// const taskStore = useTaskStore();
// console.log(taskStore.title);

defineEmits({
  emits: ["transferTaskDataToTaskDraft", "close-dialog"],
});

function createNewTaskDraft() {
  console.log("create new task draft", taskStore.title.value);
}

function toggleDark() {
  darkMode.value = !darkMode.value;
  theme.global.name.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
}
function handleTaskData(taskData) {
  console.log("Received from child:", taskData);
}

// function createNewTaskDraft() {}
// function showOnConsole() {
//   console.log("received taskData");
// }
const transferTaskDataToTaskDraft = ref(false);
function receiveEmittedData(taskData) {
  console.log("received taskData", taskData);
}
</script>

<style scoped>
/* Dark-mode toggle button styling */
.dark-toggle {
  background-color: #ffffff; /* dark grey bg */
  color: #000000; /* white icon */
  border-radius: 50%;
  transition: background-color 0.2s;
}
.dark-toggle.active {
  background-color: #ffffff; /* even darker when active */
}

/* Force the search bar’s background to white */
.search-white ::v-deep .v-input__control {
  background-color: #a5a5a5 !important;
  /* border-radius: 10%; */
}
.search-white ::v-deep .v-text-field__slot {
  background-color: #a5a5a5 !important;
}
</style>
