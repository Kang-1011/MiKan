<template>
    <v-dialog max-width="500px">
        <v-card class="rounded-xl pa-2">
            <v-card-title class="ml-3">New Draft</v-card-title>

            <v-card-text>
                <v-form ref="taskForm" @submit.prevent="createDraft" lazy-validation>
                    <v-text-field clearable label="Task Title" variant="outlined" density="compact" v-model="title"
                        rounded="lg" class="mb-1" :rules="[(v) => !!v || 'Task title is required']"></v-text-field>

                    <v-text-field clearable label="Due Date" variant="outlined" density="compact" v-model="dueDate"
                        rounded="lg" type="date" class="mb-1" :rules="[(v) => !!v || 'Due date is required']"
                        :min="tomorrowDate"></v-text-field>

                    <v-select v-model="assignee" :items="assigneeOptions" item-title="name" item-value="id" label="Assignee" 
                        clearable variant="outlined" density="compact" rounded="lg" class="mb-1" 
                        :rules="[(v) => !!v || 'Assignee is required']" />

                    <v-text-field clearable label="Project" variant="outlined" density="compact" v-model="project"
                        rounded="lg" class="mb-1" :rules="[(v) => !!v || 'Project is required']"></v-text-field>

                    <v-textarea clearable label="Task Description" variant="outlined" density="compact"
                        v-model="description" rounded="lg" rows="3" class="mb-0"
                        :rules="[(v) => !!v || 'Task description is required']"></v-textarea>
                </v-form>
            </v-card-text>

            <v-card-actions class="justify-end mb-2">
                <v-btn color="black" variant="outlined" class="text-body-2 mr-2" rounded="lg"
                    @click="closeDialog">Cancel</v-btn>

                <v-btn color="black" variant="flat" class="text-body-2  mr-4" rounded="lg"
                    @click="createDraft">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import { useDraftStore } from "@/stores/drafts";

const userStore = useUserStore()
onMounted(() => {
  if (userStore.users.length === 0) {
    userStore.fetchUsers()
  }
})

const assignee = ref(null)
const assigneeOptions = computed(() => userStore.users)

const draftStore = useDraftStore();
const title = ref("");
const dueDate = ref("");
const project = ref("");
const description = ref("");

const emit = defineEmits(["close-create-task-dialog", "pass-created-task"]);

// Reference to the v-form component
const taskForm = ref(null);
// Computed property for tomorrow's date
const tomorrowDate = computed(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow

    // Format to YYYY-MM-DD
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
});

function clearAllFields() {
    title.value = "";
    dueDate.value = "";
    assignee.value = "";
    project.value = "";
    description.value = "";
}

function closeDialog() {
    emit("close-create-task-dialog");
    clearAllFields();
    // Reset validation state when closing the dialog
    if (taskForm.value) {
        taskForm.value.resetValidation();
    }
}

async function createDraft() {
    // Validate the form
    const { valid } = await taskForm.value.validate();

    if (valid) {
        const newDraft = {
            title: title.value,
            dueDate: dueDate.value,
            assignee: assignee.value,
            project: project.value,
            description: description.value,
        };

        draftStore.addDraft(newDraft);

        emit("pass-created-task");
        clearAllFields();
        // Reset validation state after successful submission
        if (taskForm.value) {
            taskForm.value.resetValidation();
        }
    }
}
</script>
