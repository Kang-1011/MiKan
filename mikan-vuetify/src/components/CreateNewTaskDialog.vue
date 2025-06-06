<template>
  <v-card>
    <v-text-field v-model="title" label="Title" />
    <v-text-field v-model="date" label="Due Date" />
    <v-text-field v-model="assignee" label="Assignee" />
    <v-text-field v-model="descrip" label="Description" />

    <v-btn @click="createObject">Create</v-btn>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const date = ref("");
const assignee = ref("");
const descrip = ref("");
const data = ref({});
const emit = defineEmits(["transferDataToTaskDraft"]);

function createObject() {
  const data = {
    taskTitle: title.value,
    dueDate: date.value,
    assignee: assignee.value,
    description: descrip.value,
  };
  emit("transferDataToTaskDraft", data);
}
</script>
