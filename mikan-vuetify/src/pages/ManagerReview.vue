<!-- <template>
  <v-app>
    <Sidebar />
    <NavbarManagerReview />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="task in tasks" :key="task.id">
            <TaskDraft
              :id="task.id"
              :description="task.description"
            ></TaskDraft>
          </v-col>
        </v-row>
      </v-container>
      <ApproveButtonDialogue @approve="clearTasks"></ApproveButtonDialogue>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import NavbarManagerReview from "../components/NavbarManagerReview.vue";
import TaskDraft from "../components/TaskDraft.vue";
import ApproveButtonDialogue from "../components/ApproveButtonDialogue";

// const tasks = ref(
//   Array(20)
//     .fill()
//     .map((_, index) => ({
//       id: index + 1,
//       title: `Task ${index + 1}`,
//       dueDate: "2025-05-30",
//       assignee: "Team Member",
//       description: "Task description...",
//     }))
// );

// const tasks = ref(
//   Array(20)
//     .fill()
//     .map((_, index) => ({
//       id: index + 1,
//       title: `Task ${index + 1}`,
//       dueDate: "2025-05-30",
//       assignee: "Team Member",
//       description: "Task description...",
//     }))
// );

const tasks =
  reactive[
    ({
      id: 1,
      title: "Task 1",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 2,
      title: "Task 2",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 3,
      title: "Task 3",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 4,
      title: "Task 4",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    })
  ];

const clearTasks = () => {
  tasks.value = [];
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

function addTaskToList() {}
</script> -->

<template>
  <Sidebar />
  <ManagerReviewNavbar />

  <!-- Navbar Start-->
  <!-- <v-app-bar app color="red lighten-1" dark>
    <v-toolbar-title>Manager Review </v-toolbar-title>
    <v-spacer />
    <v-btn text>Filter <v-icon right>mdi-menu-down</v-icon></v-btn>

    <ManagerReviewNavbarCreateButton
      @transferTaskDataToTaskDraft="handleTaskData($event)"
    />

    <v-btn
      icon
      @click="toggleDark"
      class="ml-4"
      :class="['dark-toggle', { active: darkMode }]"
      ><v-icon>{{
        darkMode ? "mdi-weather-night" : "mdi-weather-sunny"
      }}</v-icon></v-btn
    >
    <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
    <v-text-field
      flat
      hide-details
      placeholder="Search..."
      append-inner-icon="mdi-magnify"
      class="mx-4 search-white"
      style="max-width: 200px"
    />
  </v-app-bar> -->
  <!-- Navbar End-->

  <v-row>
    <v-col>
      <TaskDraft />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
const search = ref("");
const darkMode = ref(false);
const theme = useTheme();
const isDark = ref(theme.global.name.value === "dark");
theme.global.name.value = darkMode.value ? "dark" : "light";
const create = ref(false);

defineEmits({
  emits: ["transferTaskDataToTaskDraft", "close-dialog"],
});

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
