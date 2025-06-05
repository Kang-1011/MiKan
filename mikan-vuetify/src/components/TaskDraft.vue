<template>
  <v-card class="pa-4" elevation="4" rounded="lg">
    <div
      class="d-flex justify-space-between align-center mb-4"
      style="padding: 8px; border-radius: 8px"
    >
      <v-chip
        color=""
        text-color="black"
        class="font-weight-medium text-h6 px-4"
        style="min-width: 150px"
        label
      >
        {{ taskTitle }}
      </v-chip>
      <div class="d-flex align-center">
        <DeleteButtonDialogue></DeleteButtonDialogue>
        <EditTaskDialog></EditTaskDialog>
      </div>
    </div>

    <v-row class="mb1" dense>
      <v-col cols="6">
        <v-sheet class="pa-2 rounded bg-grey-lighten-2">
          <strong>Due date:</strong> {{ taskData.dueDate }}
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" class="d-flex align-center mb-2">
        <strong class="mr-2">{{ taskData.assignee }}:</strong>
        <v-avatar
          v-for="(user, index) in avatars"
          :key="index"
          class="mr-1"
          size="28"
        >
          <v-img :src="user.img" alt="User" />
        </v-avatar>
        <v-avatar size="28" color="grey darken-2">
          <span class="text-caption white--text">+3</span>
        </v-avatar>
      </v-col>
    </v-row>

    <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>{{ taskData.description }}</em>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import DeleteButtonDialogue from "./DeleteButtonDialogue";
import EditTaskDialog from "./EditTaskDialog.vue";
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
const taskTitle = ref("Task Title");
const dueDate = ref("2025-05-30");
const description = ref("Description...");
const avatars = ref([
  { img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { img: "https://randomuser.me/api/portraits/men/3.jpg" },
]);
</script>
