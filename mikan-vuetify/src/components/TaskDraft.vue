<template>
  <div v-if="!isApproved">
    <v-card class="pa-2" elevation="4">
      <div
        class="d-flex justify-space-between align-center mb-4"
        style="padding: 8px; border-radius: 8px"
      >
        <v-chip
          color="red"
          text-color="black"
          class="font-weight-medium text-h6 px-4"
          style="min-width: 150px"
          label
        >
          {{ taskTitle }}
        </v-chip>
        <div class="d-flex justify-end">
          <ApproveOneTask @approved="handleApproval"></ApproveOneTask>
          <DeleteButtonDialogue></DeleteButtonDialogue>
          <EditTaskDialog></EditTaskDialog>
        </div>
      </div>
      <!-- new topbar, use this when fixing the top bar -->
      <!-- <v-row class="align-center bg-red pa-2 rounded-lg">
        <v-col>
          <h2 class="d-flex justify-start">Task title</h2>
        </v-col>
        <v-col>
          <div class="d-flex">
            <ApproveOneTask @approved="handleApproval"></ApproveOneTask>
            <DeleteButtonDialogue></DeleteButtonDialogue>
            <EditTaskDialog></EditTaskDialog>
          </div>
        </v-col>
      </v-row> -->

      <v-row class="pa-2">
        <v-col>
          <v-sheet class="rounded bg-grey-lighten-2">
            <strong>Due date:</strong> {{ taskData.dueDate }}
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="pa-2">
        <v-col class="d-flex align-center mb-2">
          <strong class="mr-2">{{ taskData.assignee }}:</strong>
        </v-col>
      </v-row>

      <!-- description box, removed but if needed again, uncomment -->
      <!-- <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>{{ taskData.description }}</em>
    </v-sheet> -->
    </v-card>
  </div>
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    color="success"
    variant="tonal"
    class="justify-center align center"
    location="center middle"
  >
    <h1 class="text-center">Task approved!</h1>
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import DeleteButtonDialogue from "./DeleteButtonDialogue";
import EditTaskDialog from "./EditTaskDialog.vue";
import ApproveOneTask from "./ApproveOneTaskButton";

const props = defineProps({
  taskData: {
    type: Object,
    required: true,
  },
  taskIndex: {
    type: Number,
    required: true,
  },
});

const isApproved = ref(false);
const snackbar = ref(false);
function handleApproval() {
  isApproved.value = true;
  snackbar.value = true;
}

const taskTitle = ref("Task Title");
const dueDate = ref("2025-05-30");
const description = ref("Description...");
// const avatars = ref([
//   { img: "https://randomuser.me/api/portraits/men/1.jpg" },
//   { img: "https://randomuser.me/api/portraits/women/2.jpg" },
//   { img: "https://randomuser.me/api/portraits/men/3.jpg" },
// ]);
</script>
