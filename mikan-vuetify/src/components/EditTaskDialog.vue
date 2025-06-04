<template>
  <v-container>
    <v-btn
      icon
      color="yellow-darken-2"
      size="35"
      class="mr-1"
      @click="dialog = true"
    >
      <v-icon size="25">mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline ml-3 mt-5">Edit Task</v-card-title>

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
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  initialTask: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["cancel", "save", "regenerate"]);

const dialog = ref(false);
const taskTitle = ref("");
const dueDate = ref("");
const assignee = ref("");
const taskDescription = ref("");

// Watch dialog: when it opens, pre-fill task data
watch(dialog, (value) => {
  if (value && props.initialTask) {
    taskTitle.value = props.initialTask.title || "";
    dueDate.value = props.initialTask.dueDate || "";
    assignee.value = props.initialTask.assignee || "";
    taskDescription.value = props.initialTask.description || "";
  }
});

function cancel() {
  dialog.value = false;
  emit("cancel");
}

function save() {
  if (validatedForm()) {
    dialog.value = false;
    emit("save", {
      title: taskTitle.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
      description: taskDescription.value,
    });
  }
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

/* Example usage in a parent component: */
<!-- <template>
    <EditTaskDialog
        :initialTask="currentTask"
        @cancel="handleCancel"
        @save="handleSave"
        @regenerate="handleRegenerate"
    />
</template>

<script>
import { ref } from 'vue';
import EditTaskDialog from "../components/EditTaskDialog.vue";

export default {

  components: {
    EditTaskDialog,
  },

  setup() {
    // Initialize currentTask with properties that match what EditTaskDialog expects/emits
    const currentTask = ref({
      title: 'Sample Task Title',
      dueDate: '2023-12-31', // Example date format
      assignee: 'John Doe',
      description: 'This is a sample task description that will be pre-filled in the dialog.',
    });

    const handleCancel = () => {
      console.log('Edit cancelled by user.');
    };

    const handleSave = (task) => {
      console.log('Task saved:', task);
      // Update the parent's currentTask with the new data received from the dialog
      currentTask.value = { ...task }; 
    };

    const handleRegenerate = () => {
      console.log('Task regeneration requested.');
      // Add logic here to regenerate task content, e.g., make an API call to get new content
    };

    return {
      currentTask,
      handleCancel,
      handleSave,
      handleRegenerate,
    };
  },
};
</script>
 -->
