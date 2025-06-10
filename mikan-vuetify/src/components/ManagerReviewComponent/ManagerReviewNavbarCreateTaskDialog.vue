<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-text-field class="ml-2 mr-2 mt-2" v-model="title" label="Title" />
      </v-card-text>
      <v-card-text>
        <v-text-field
          class="ml-2 mr-2 mb-2"
          v-model="assignee"
          label="Assignee"
        />
      </v-card-text>
      <v-card-action>
        <div>
          <v-btn @click="closeDialog" class="pa-1 ml-2 mr-2 mb-2">
            cancel
          </v-btn>
          <v-btn @click="createObject" class="pa-1 ml-2 mr-2 mb-2"
            >Create</v-btn
          >
        </div>
      </v-card-action>

      <!-- <v-text-field v-model="assignee" label="Assignee" />
      <v-text-field v-model="assignee" label="Due date" />
      <v-text-field v-model="descrip" label="Description" /> -->
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const date = ref("");
const assignee = ref("");
const descrip = ref("");
const data = ref({});
const emit = defineEmits(["transferDataToTaskDraft", "close-dialog"]);

function createObject() {
  const data = {
    taskTitle: title.value,
    dueDate: date.value,
    assignee: assignee.value,
    description: descrip.value,
  };
  emit("transferDataToTaskDraft", data);
  emit("close-dialog");
}

function closeDialog() {
  emit("close-dialog");
}
</script>
