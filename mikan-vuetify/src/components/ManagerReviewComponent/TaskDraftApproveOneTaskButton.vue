<template>
    <div>
        <v-tooltip text="Approve" location="top">
            <template #activator="{ props }">
                <v-btn icon v-bind="props" @click.stop="dialog = true" class="stage-button-approve" variant="flat" density="compact" style="background: transparent;">
                    <v-icon size="large" >mdi-check-circle-outline</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>

    <v-dialog v-model="dialog" max-width="500px">
        <v-card class="rounded-xl pa-3 px-6">
            <v-card-title>Approve Task?</v-card-title>
            <div align="center" class="mb-2">
                <v-icon size="60">mdi-alert-circle-check-outline</v-icon>
            </div>
            <v-card-subtitle align="center">
                Are you sure you want to approve this task?<br />This cannot be
                undone.
            </v-card-subtitle>

            <v-card-actions class="my-2">
                <v-btn color="black" variant="outlined" class="text-body-2 mr-2" rounded="lg" @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="black" variant="flat" class="text-body-2 mr-2" rounded="lg" @click="approveDraft">
                    Approve
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useDraftStore } from '@/stores/drafts';
const draftStore = useDraftStore()

const dialog = ref(false);
const openDialog = () => {
    dialog.value = true
}
defineExpose({ openDialog })

const taskIndex = inject("taskIndex");
const emit = defineEmits(["task-approved"])

function approveDraft() {
  console.log("Approve One Task - API call to approve this draft");

  draftStore.approveOneDraft(taskIndex);  // <- Approve the draft in DB
  emit("task-approved");                    // <- Notify parent if needed
  dialog.value = false;                     // <- Close the dialog
}

</script>
