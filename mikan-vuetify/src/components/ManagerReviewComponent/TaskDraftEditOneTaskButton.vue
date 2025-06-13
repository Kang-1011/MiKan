<template>
  <div>
    <v-btn
      icon
      color="yellow-darken-2"
      @click="dialog = true"
      variant="flat"
      density="compact"
    >
      <v-icon size="default">mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="w-auto">
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
          <v-btn color="grey" text @click="cancel" class="ma-2 pa-1">Cancel</v-btn>
          <v-btn color="primary" @click="save" class="ma-2 pa-1">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDraftStore } from '@/stores/drafts';
const draftStore = useDraftStore()

const taskIndex = inject("taskIndex");
const retrievedDraft = draftStore.getDraftById(taskIndex)

const emit = defineEmits(["task-edited"]);

const dialog = ref(false);
const taskTitle = ref("");
const dueDate = ref("");
const assignee = ref("");
const taskDescription = ref("");

taskTitle.value = retrievedDraft.title;
dueDate.value = retrievedDraft.dueDate;
assignee.value = retrievedDraft.assignee;
taskDescription.value = retrievedDraft.description;

// Watch dialog: when it opens, pre-fill task data
// watch(dialog, (value) => {
//   if (value && props.initialTask) {
//     taskTitle.value = props.initialTask.title || "";
//     dueDate.value = props.initialTask.dueDate || "";
//     assignee.value = props.initialTask.assignee || "";
//     taskDescription.value = props.initialTask.description || "";
//   }
// });

function cancel() {
  dialog.value = false;
}

function save() {
  if (validatedForm()) {
    dialog.value = false;
    emit("task-edited");
    const editedDraft = {
      title: taskTitle.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
      description: taskDescription.value,
    }
    draftStore.editDraft(taskIndex, editedDraft);
  }
}

function validatedForm() {
  // Placeholder for validation logic
  return true;
}
</script>