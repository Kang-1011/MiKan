<!-- <template>
  <Sidebar />
  <ManagerReviewNavbar />
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

function toggleDark() {
  darkMode.value = !darkMode.value;
  theme.global.name.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
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
</style> -->

<template>
  <Sidebar />
  <ManagerReviewNavbar />
  <v-row>
    <v-col>
      <!-- Form for creating new tasks -->
      <TaskDraftForm @task-created="handleTaskCreated" />

      <!-- Display all created task drafts -->
      <v-row class="mt-4">
        <v-col
          v-for="task in taskStore.tasks"
          :key="task.id"
          cols="12"
          md="6"
          lg="4"
        >
          <TaskDraftDisplay :task="task" @delete-task="handleDeleteTask" />
        </v-col>
      </v-row>

      <!-- Show message when no tasks -->
      <v-row v-if="taskStore.tasks.length === 0" class="mt-4">
        <v-col>
          <v-card class="pa-4 text-center">
            <v-card-text>
              <em>No task drafts created yet. Create your first task above!</em>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useTaskStore } from "@/stores/newTask";

const taskStore = useTaskStore();

const search = ref("");
const darkMode = ref(false);
const theme = useTheme();
const isDark = ref(theme.global.name.value === "dark");
theme.global.name.value = darkMode.value ? "dark" : "light";

function toggleDark() {
  darkMode.value = !darkMode.value;
  theme.global.name.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
}

function handleTaskCreated(taskData) {
  console.log("New task created:", taskData);
}

function handleDeleteTask(taskId) {
  taskStore.deleteTask(taskId);
}
</script>

<style scoped>
/* Your existing styles */
.dark-toggle {
  background-color: #ffffff;
  color: #000000;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.dark-toggle.active {
  background-color: #ffffff;
}

.search-white ::v-deep .v-input__control {
  background-color: #a5a5a5 !important;
}
.search-white ::v-deep .v-text-field__slot {
  background-color: #a5a5a5 !important;
}
</style>
