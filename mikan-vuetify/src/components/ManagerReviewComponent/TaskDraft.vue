<template>
  <v-card class="pa-1 ma-4" max-width="500px">
    <v-row class="align-center bg-red px-2 pt-3 pb-1 rounded-lg">
      <v-col cols="7" sm="8">
        <strong class="d-flex justify-start text-truncate">{{
          props.title
        }}</strong>
      </v-col>
      <v-col cols="5" sm="4" class="d-flex justify-end">
        <div class="d-flex align-center justify-end" style="gap: 10px">
          <TaskDraftApproveOneTaskButton />
          <TaskDraftDeleteOneTaskButton />
          <TaskDraftEditOneTaskButton />
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-2">
      <v-col cols="12">
        <v-sheet class="rounded bg-grey-lighten-2 mb-2 pa-1">
          <strong>Due date:</strong> {{ props.dueDate }}
        </v-sheet>
        <v-sheet class="rounded bg-grey-lighten-2 mb-2 pa-1">
          <strong>Assignee:</strong> {{ props.assignee }}
        </v-sheet>
      </v-col>
    </v-row>

    <!-- description box, removed but if needed again, uncomment -->
    <!-- <v-sheet class="pa-3 rounded border" min-height="120px">
      <em>Description</em>
    </v-sheet> -->
  </v-card>
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    color="success"
    variant="tonal"
    class="justify-center align center"
    location="center middle"
  >
    <h1 class="text-center">Task approved!</h1>
  </v-snackbar>
</template>

<script setup>
const props = defineProps({
  title: String,
  dueDate: String,
  assignee: String,
  description: String,
});
</script>
