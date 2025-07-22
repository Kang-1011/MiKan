<template>
    <!-- New Task Draft V4 -->
    <v-card flat border class="mx-auto rounded-v1 border-2 task-card-1">
        <v-card @click="openEditDialog" hover flat :ripple="false" class="stage-background pa-2">
            <v-card-title class="text-truncate">
                <v-row class="align-center text-truncate">
                    <v-col cols="10" class="text-truncate">
                        {{props.title}}
                    </v-col>
                    <v-col cols="2">
                        <div class="d-flex justify-center" style="gap: 10px;">
                            <TaskDraftApproveOneTaskButton @task-approved="handleTaskApproved"/>
                            <TaskDraftDeleteOneTaskButton @task-deleted="handleTaskDeleted" />
                            <TaskDraftEditOneTaskButton @task-edited="handleTaskEdited" ref="editDialogRef"/>
                        </div>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card flat border class="rounded-v2">
                <v-card-text>
                        <v-row>
                            <v-col>
                                <div class="text-caption text-medium-emphasis">Due Date</div>
                                <strong>{{ props.dueDate }}</strong>
                            </v-col>
                            <v-col>
                                <div class="text-caption text-medium-emphasis">Assignee</div>
                                <strong>{{ props.assignee }}</strong>
                            </v-col>
                        </v-row>
                        <div class="text-caption pt-4 text-medium-emphasis">Project</div>
                                <strong>{{ props.project }}</strong>
                        <div class="text-caption pt-4 text-medium-emphasis">Description</div>
                        <div style="white-space: pre-wrap; min-height: 80px; max-height: 80px; overflow: hidden;">
                            <strong>{{ props.description }}</strong>
                        </div>
                </v-card-text>
            </v-card>
        </v-card>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

const editDialogRef = ref()
const openEditDialog = () => {
    editDialogRef.value?.openDialog()
}
const approveDialogRef = ref()
const openApproveDialog = () => {
    approveDialogRef.value?.openDialog()
}
const deleteDialogRef = ref()
const openRejectDialog = () => {
    deleteDialogRef.value?.openDialog()
}

const props = defineProps({
    taskIndex: Number,
    title: String,
    dueDate: String,
    assignee: String,
    project: String,
    description: String,
});

provide("taskIndex", props.taskIndex)

const emit = defineEmits(["task-approved", "task-deleted", "task-edited"]);

function handleTaskApproved() {
    emit("task-approved");
}

function handleTaskDeleted() {
    emit("task-deleted");
}

function handleTaskEdited() {
    emit("task-edited");
}
</script>

<style scoped></style>
