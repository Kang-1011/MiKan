<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    max-width="400"
  >
    <v-card class="w-auto">
      <v-card-title class="headline ml-3 mt-5">New Task</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Task Title"
              v-model="taskTitle"
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
              v-model="taskDescription"
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="grey" text @click="cancel">Cancel</v-btn>

        <v-btn color="primary" @click="save">Save</v-btn>

        <v-btn color="secondary" @click="regenerate">Regenerate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

// const { cards, addCard } = useCards();
const emit = defineEmits(["update:modelValue", "cancel", "save"]);

defineProps(["modelValue"]);

// Reactive state
const dialog = ref(false);
const taskTitle = ref("");
const dueDate = ref("");
const assignee = ref("");
const taskDescription = ref("");

// Watch dialog open state
watch(dialog, (value) => {
  if (value && props.initialTask) {
    taskTitle.value = props.initialTask.title || "";
    dueDate.value = props.initialTask.dueDate || "";
    assignee.value = props.initialTask.assignee || "";
    taskDescription.value = props.initialTask.description || "";
  }
});

function cancel() {
  emit("update:modelValue", false); // 👈 closes the dialog
  emit("cancel"); // 👈 optional event for parent
}

function save() {
  emit("save", {
    title: taskTitle.value,
    dueDate: dueDate.value,
    assignee: assignee.value,
    description: taskDescription.value,
  });
  emit("update:modelValue", false);
}

function regenerate() {
  dialog.value = false;
  emit("regenerate");
}

function validatedForm() {
  // Placeholder for validation logic
  return true;
}
</script>
