<template>
    <v-dialog max-width="500px">
        <v-card class="rounded-xl pa-3 px-6">
            <v-card-title>Create New Project</v-card-title>
            
            <v-card-text>
                <v-text-field clearable label="New Project Name" variant="outlined" density="compact" v-model="projectName"
                        rounded="lg" class="my-1" :rules="[(v) => !!v || 'Project Name is required']">
                </v-text-field>
            </v-card-text>

            <v-card-actions class="my-2">
                <v-btn color="black" variant="outlined" class="text-body-2 mr-2" rounded="lg" @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn color="black" variant="flat" class="text-body-2 mr-2" rounded="lg" @click="createNewProject">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const projectName = ref("");

const emit = defineEmits(["close-create-project-dialog"]);
const closeDialog = () => {
    projectName.value = "";
    emit("close-create-project-dialog");
}

const createNewProject = () => {
    console.log("Create New Project - API calls to save into database");
    closeDialog();
}
</script>