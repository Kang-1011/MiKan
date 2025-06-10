<template>
  <v-card class="pa-1 ma-4 w-33">
    <v-row class="align-center bg-red pa-1 rounded-lg">
      <v-col cols="8">
        <strong class="d-flex justify-start">Task title</strong>
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
          <strong>Due date:</strong> I want to add the received data here
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 ml-2 mr-2 mb-2 pa-1">
          <strong>Assignee:</strong> I want to add the received data here
        </v-sheet>
      </div>
    </v-row>

    <!-- description box, removed but if needed again, uncomment -->
    <!-- <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>Description</em>
    </v-sheet> -->
  </v-card>
</template>

<script setup></script>
