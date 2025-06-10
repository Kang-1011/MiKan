<!-- <template>
  <v-container>
    <v-card>
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.title"
        label="Task title"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.dueDate"
        label="Due Date"
        type="date"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.assignee"
        label="Assignee"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.description"
        label="Description"
      />

      <v-card-action>
        <div>
          <v-btn @click="closeDialog" class="ma-2 pa-1">Cancel</v-btn>
          <v-btn @click="createTask" class="ma-2 pa-1">Create</v-btn>
        </div>
      </v-card-action>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/newTask";

const taskStore = useTaskStore();

const title = ref("");
const dueDate = ref("");
const assignee = ref("");
const description = ref("");
const taskData = ref({});
const emit = defineEmits(["close-dialog"]);

function createTask() {
  const taskData = taskStore.getTaskData();
  emit("close-dialog");

  console.log(taskData);
}



function closeDialog() {
  taskStore.clearAllFields();
  console.log("dialog closed");
}
</script> -->

<!-- new -->

<template>
  <v-container>
    <v-card>
      <v-card-title>Create New Task</v-card-title>
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.currentTask.title"
        label="Task title"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.currentTask.dueDate"
        label="Due Date"
        type="date"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.currentTask.assignee"
        label="Assignee"
      />
      <v-text-field
        class="ma-2 pa-1"
        v-model="taskStore.currentTask.description"
        label="Description"
      />

      <v-card-actions>
        <div>
          <v-btn @click="clearForm" class="ma-2 pa-1">Clear</v-btn>
          <v-btn @click="createTask" class="ma-2 pa-1" color="primary"
            >Create</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useTaskStore } from "@/stores/newTask";

const taskStore = useTaskStore();
const emit = defineEmits(["task-created"]);

function createTask() {
  // Validate that required fields are filled
  if (!taskStore.currentTask.title.trim()) {
    alert("Please enter a task title");
    return;
  }

  // Create the task and clear form
  const newTask = taskStore.createNewTask();

  // Emit event to parent
  emit("task-created", newTask);

  console.log("Task created:", newTask);
}

function clearForm() {
  taskStore.clearCurrentTask();
}
</script>
