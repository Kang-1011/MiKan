<template>
  <div>
    <v-btn
      icon
      color="blue-darken-4"
      @click="approveTask"
      variant="flat"
      density="compact"
    >
      <v-icon class="align-center justify-center" size="default"
        >mdi-check</v-icon
      >
    </v-btn>
  </div>
</template>

<script setup>
import { useDraftStore } from '@/stores/drafts';
const draftStore = useDraftStore()

const taskIndex = inject("taskIndex");
const emit = defineEmits(["task-approved"])

function approveTask() {
  console.log("Approve One Task - API calls to save into database");
  emit("task-approved")
  draftStore.deleteDraft(taskIndex);
}
</script>
