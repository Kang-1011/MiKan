<template>
    
    <div>
        <v-tooltip text="Delete" location="top">
            <template #activator="{ props }">
                <v-btn icon v-bind="props" @click.stop="dialog = true"  class="stage-button-delete" variant="flat" density="compact" style="background: transparent;">
                    <v-icon size="large" >mdi-delete-outline</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="rounded-xl pa-3 px-6">
                <v-card-title>Delete Task?</v-card-title>
                <div align="center" class="mb-2">
                    <v-icon size="60">mdi-delete-alert-outline</v-icon>
                </div>
                <v-card-subtitle align="center">
                    Are you sure you want to delete this task?<br />This action cannot be
                    undone.
                </v-card-subtitle>

                <v-card-actions class="my-2">
                <v-btn color="black" variant="outlined" class="text-body-2 mr-2" rounded="lg" @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="black" variant="flat" class="text-body-2 mr-2" rounded="lg" @click="deleteTask">
                    Delete
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraftStore } from '@/stores/drafts';
const draftStore = useDraftStore()

const dialog = ref(false);
const openDialog = () => {
    dialog.value = true
}
defineExpose({ openDialog })

const taskIndex = inject("taskIndex");
const emit = defineEmits(["task-deleted"]);

function deleteTask() {
    console.log("Item deleted");
    draftStore.deleteDraft(taskIndex);
    dialog.value = false;
    emit("task-deleted");
}
</script>

<style scoped>

</style>
