<template>
  <v-dialog :model-value="modelValue" max-width="400">
    <v-card class="w-auto">
      <v-card-title class="headline ml-3 mt-5">New Task</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Task Title"
              v-model="title"
              :rules="[(v) => !!v || 'Task title is required']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Due Date"
              v-model="dueDate"
              type="date"
              :rules="[(v) => !!v || 'Due date is required']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Assignee"
              v-model="assignee"
              :rules="[(v) => !!v || 'Task title is required']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Task Description"
              v-model="description"
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="grey" text @click="closeDialog" class="ma-2 pa-1"
          >Cancel</v-btn
        >

        <v-btn color="primary" @click="createDraft" class="ma-2 pa-1"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDraftStore } from "@/stores/drafts";

const draftStore = useDraftStore();
const title = ref("");
const dueDate = ref("");
const assignee = ref("");
const description = ref("");

const emit = defineEmits(["close-create-task-dialog", "pass-created-task"]);

function closeDialog() {
  // taskStore.clearAllFields();
  emit("close-create-task-dialog");
}

function createDraft() {
  const newDraft = {
    title: title.value,
    dueDate: dueDate.value,
    assignee: assignee.value,
    description: description.value,
  };
  console.log(title.value);
  console.log(dueDate.value);
  console.log(assignee.value);
  console.log(description.value);
  // draftStore.addDraft(newDraft);
  emit("pass-created-task");
  // taskStore.clearAllFields();
}
</script>
