<template>
    <v-dialog max-width="500px">
        <v-card class="rounded-v1 pa-3 px-6">
            <v-card-title>Create New Project</v-card-title>
            
            <v-card-text>
                <v-text-field clearable label="New Project Name" variant="outlined" density="compact" v-model="projectName"
                        rounded="xl" class="my-1" :rules="[(v) => !!v || 'Project Name is required']">
                </v-text-field>
            </v-card-text>

            <v-card-actions class="my-2">
                <v-btn variant="outlined" class="text-body-2 rounded-xl mr-2 button-secondary" @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn  variant="flat" class="text-body-2 mr-2 rounded-xl button-primary" @click="createNewProject">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const projectName = ref("");

const emit = defineEmits(["close-create-project-dialog", "project-created"]);

const closeDialog = () => {
    projectName.value = "";
    emit("close-create-project-dialog");
}

const createNewProject = async () => {
    if (!projectName.value) return;

    try {
        const response = await axios.post("http://localhost:8000/projects/add_project", {
            title: projectName.value,
        });
        emit("project-created", response.data);
        closeDialog();
    } catch (error) {
        console.error("Error creating project:", error);
    }
}
</script>