<template>
  <v-app>
    <Sidebar class="position-fixed" />
    <Topbar title="Manager Review" />
    <v-app-bar app dark flat="">
      <!-- <v-app-bar-title> Task Manager </v-app-bar-title> -->

      <v-spacer></v-spacer>

      <v-btn
        variant="elevated"
        color="yellow"
        class="mr-2"
        @click="handleButton1Click"
      >
        <v-icon left>mdi-plus</v-icon>
        Create Task
      </v-btn>

      <v-btn variant="elevated" color="green" @click="handleButton2Click">
        <v-icon left>mdi-check</v-icon>
        Approve All
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(item, index) in tasks"
            :key="index"
          >
            <TaskDraft
              :task-data="item"
              :task-index="index"
              @delete-task="deleteTask"
            ></TaskDraft>
          </v-col>
        </v-row>
      </v-container>
      <ApproveButtonDialogue @approve="clearTasks"></ApproveButtonDialogue>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/newTask";
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
