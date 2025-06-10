<!-- <template>
  <v-card class="pa-1 ma-4 w-33">
    <v-row class="align-center bg-red pa-1 rounded-lg">
      <v-col cols="8">
        <strong class="d-flex justify-start"
          >I want to add the received data here</strong
        >
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <div class="d-flex justify-end">
          <TaskDraftApproveOneTaskButton />
          <TaskDraftDeleteOneTaskButton />
          <TaskDraftEditOneTaskButton />
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-2">
      <div>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Due date:</strong>
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Assignee:</strong> I want to add the received data here
        </v-sheet>
      </div>
    </v-row> -->

<!-- description box, removed but if needed again, uncomment -->
<!-- <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>Description</em>
    </v-sheet> -->
<!-- </v-card>
</template>

<script setup></script> -->
<!-- new start -->
<!-- <template>
  <v-card class="pa-1 ma-4 w-33">
    <v-row class="align-center bg-red pa-1 rounded-lg">
      <v-col cols="8">
        <strong class="d-flex justify-start">{{
          taskStore.title || "Task title"
        }}</strong>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <div class="d-flex justify-end">
          <TaskDraftApproveOneTaskButton />
          <TaskDraftDeleteOneTaskButton />
          <TaskDraftEditOneTaskButton />
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-2">
      <div>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Due date:</strong> {{ taskStore.dueDate || "No date set" }}
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Assignee:</strong> {{ taskStore.assignee || "No assignee" }}
        </v-sheet>
        <v-sheet
          v-if="taskStore.description"
          class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1"
        >
          <strong>Description:</strong> {{ taskStore.description }}
        </v-sheet>
      </div>
    </v-row>
  </v-card>
</template>

<script setup>
import { useTaskStore } from "@/stores/newTask";

const taskStore = useTaskStore();
</script> -->
<!-- new end -->

<!-- latest -->
<template>
  <v-card class="pa-1 ma-2">
    <v-row class="align-center bg-blue pa-1 rounded-lg">
      <v-col cols="8">
        <strong class="d-flex justify-start">{{
          task.taskTitle || "Untitled Task"
        }}</strong>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <div class="d-flex justify-end">
          <TaskDraftApproveOneTaskButton :task-id="task.id" />
          <TaskDraftDeleteOneTaskButton
            :task-id="task.id"
            @delete="$emit('delete-task', task.id)"
          />
          <TaskDraftEditOneTaskButton :task-id="task.id" />
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-2">
      <div>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Due date:</strong> {{ formatDate(task.dueDate) }}
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Assignee:</strong> {{ task.assignee || "No assignee" }}
        </v-sheet>
        <v-sheet
          v-if="task.description"
          class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1"
        >
          <strong>Description:</strong> {{ task.description }}
        </v-sheet>
      </div>
    </v-row>

    <v-card-subtitle class="text-caption">
      Created: {{ formatDate(task.createdAt) }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-task"]);

function formatDate(date) {
  if (!date) return "No date set";
  return new Date(date).toLocaleDateString();
}
</script>
