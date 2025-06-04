<!-- <template>
  <v-card class="pa-4" elevation="4" rounded="lg">
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
</script> -->

<template>
  <v-card elevation="4" height="320">
    <v-row class="align-center pa-2 rounded-lg">
      <v-col cols="8" class="bg-blue-grey-lighten-2">
        <h2 class="d-flex justify-start">Task title</h2>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <deleteTask size="small" class="mr-1"></deleteTask>
          <editTask size="small"></editTask>
        </div>
      </v-col>
    </v-row>
    <v-sheet>
      <v-row class="align-center pl-2">
        <v-col cols="1">
          <v-icon>mdi-calendar</v-icon>
        </v-col>
        <v-col cols="5">
          <div>Due date</div>
        </v-col>
        <v-col cols="1">
          <v-icon>mdi-human</v-icon>
        </v-col>
        <v-col cols="5">
          <div>Assignee</div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row class="align-center">
      <v-col class="pa-2">
        <v-sheet class="border rounded overflow-y-scroll" height="200">
          <div></div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
// import DeleteButtonDialogue from "./DeleteButtonDialogue";
// import EditTaskDialog from "./EditTaskDialog.vue";
import deleteTask from "./TaskDraftDeleteButton";
// import editTask from "./TaskDraftEditButton";

// const props = defineProps({
//   taskData: {
//     type: Object,
//     required: true,
//   },
//   taskIndex: {
//     type: Number,
//     required: true,
//   },
// });
// const taskTitle = ref("Task Title");
// const dueDate = ref("2025-05-30");
// const description = ref("Description...");
// const avatars = ref([
//   { img: "https://randomuser.me/api/portraits/men/1.jpg" },
//   { img: "https://randomuser.me/api/portraits/women/2.jpg" },
//   { img: "https://randomuser.me/api/portraits/men/3.jpg" },
// ]);
</script>
