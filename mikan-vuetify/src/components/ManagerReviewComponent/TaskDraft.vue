<template>
  <v-card class="pa-2 ma-2" elevation="4">
    <!-- top bar -->
    <v-row class="align-center bg-red pl-1 pr-1 pt-1 pb-1 rounded-lg">
      <v-col>
        <h2 class="d-flex justify-start">Task title</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <div class="d-flex justify-end">
          <ApproveOneTaskButton></ApproveOneTaskButton>
          <DeleteOneTaskButton></DeleteOneTaskButton>
          <EditOneTaskButton></EditOneTaskButton>
        </div>
      </v-col>
    </v-row>

    <!-- due date -->
    <v-row class="pa-2">
      <div>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mt-2 mb-2 pa-1">
          <strong>Due date:</strong> 25 July 2025
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mt-2 mb-2 pa-1">
          <strong>Assignee:</strong> Rohimi
        </v-sheet>
      </div>
    </v-row>

    <!-- description box, removed but if needed again, uncomment -->
    <!-- <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>Description</em>
    </v-sheet> -->
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import DeleteOneTaskButton from "./TaskDraftDeleteOneTaskButton";
import EditOneTaskButton from "./TaskDraftEditOneTaskButton.vue";
import ApproveOneTaskButton from "./TaskDraftApproveOneTaskButton";
</script>
