<template>
    <Sidebar3></Sidebar3>

    <v-main style="height: 100vh" class="pa-3 bg-grey-lighten-4">
        <v-card class="fill-height rounded-lg card-1" flat>
            <v-card border="0" flat style="height: 100%; overflow-y: auto;">
                <div style="position: sticky; top: 0; z-index: 10; background: white;">
                    <v-card-title class="d-flex align-center justify-space-between">
                        <div>Manager Review</div>

                        <div>
                            <v-btn variant="outlined" color="black" class="mr-2 text-body-2 rounded-lg"
                                @click="openCreateTaskDialog()">
                                <v-icon left>mdi-plus</v-icon>
                                Create
                            </v-btn>
                            <v-btn :disabled="draftStore.drafts.length === 0" variant="flat" color="black"
                                class="mr-2 text-body-2 rounded-lg" @click="openApproveAllDialog()">
                                <v-icon left>mdi-check-all</v-icon>
                                Approve All
                            </v-btn>
                        </div>
                    </v-card-title>
                    <!-- <v-card-text class="d-flex justify-end">
                        <v-btn size="small" variant="outlined" color="black" class="mr-2 text-caption"
                            @click="openCreateTaskDialog()">
                            <v-icon left>mdi-plus</v-icon>
                            Create
                        </v-btn>
                        <v-btn :disabled="draftStore.drafts.length === 0" size="small" variant="flat" color="black"
                            class="mr-2 text-caption" @click="openApproveAllDialog()">
                            <v-icon left>mdi-check-all</v-icon>
                            Approve All
                        </v-btn>
                    </v-card-text> -->
                    <v-card-subtitle>
                        <v-divider :thickness="1" :opacity="1"></v-divider>
                    </v-card-subtitle>
                </div>

                <v-container v-if="draftStore.drafts.length === 0 && !snackbar" style="height: 90%;" fluid
                    class="d-flex align-center justify-center">
                    <h2 class="text-center text-black">No pending tasks</h2>
                </v-container>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" sm="6" md="4" v-for="draft in draftStore.drafts" :key="draft.id">
                            <TaskDraft :taskIndex="draft.id" :title="draft.title" :dueDate="draft.due_date"
                                :assignee="draft.assignee.name" :project="draft.project.title" :description="draft.description"
                                @task-approved="oneTaskApproved($event)" @task-deleted="oneTaskDeleted($event)"
                                @task-edited="oneTaskEdited($event)"></TaskDraft>
                        </v-col>
                    </v-row>
                    <CreateTaskDialog v-model="newTaskDialogFlag" @close-create-task-dialog="newTaskDialogFlag = false"
                        @pass-created-task="createNewDraft()" />
                    <ApproveAllDialog v-model="approveAllDialogFlag"
                        @close-approve-dialog="approveAllDialogFlag = false"
                        @approve-all-drafts="approveAllDrafts($event)" />
                    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarColor" variant="tonal"
                        class="justify-center align center" location="center middle">
                        <h1 class="text-center">{{ snackbarMessage }}</h1>
                    </v-snackbar>
                    <Toast position="top-right" group="tr" />
                </v-container>
            </v-card>
        </v-card>
        
    <Chatbot />
    </v-main>
</template>

<script setup>
import { ref } from "vue";
import ApproveAllDialog from "@/components/ManagerReviewComponent/ManagerReviewApproveAllDialog.vue";
import CreateTaskDialog from "@/components/ManagerReviewComponent/ManagerReviewCreateTaskDialog.vue";
import TaskDraft from "@/components/ManagerReviewComponent/TaskDraft.vue";
const newTaskDialogFlag = ref(false);
const approveAllDialogFlag = ref(false);
import { useChatbotStore } from '@/stores/chatbotStore'; // 1. Import the chatbot store 
const chatbotStore = useChatbotStore(); // 2. Create an instance of the chatbot store

import { useDraftStore } from "@/stores/drafts";
const draftStore = useDraftStore();
onMounted(async () => {
  await draftStore.fetchFromAPI();
});
// import { drafts, fetchDrafts } from '@/stores/dummy';
// onMounted(() => {
//     fetchDrafts();
// });

import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const toastSeverity = ref("");
const toastSummary = ref("");
const showBottomRight = (paramSeverity, paramSummary) => {
    toast.add({ severity: paramSeverity, summary: paramSummary, group: 'tr', life: 3000 });
};

const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("");

function openCreateTaskDialog() {
    newTaskDialogFlag.value = true;
}

function openApproveAllDialog() {
    approveAllDialogFlag.value = true;
}

// Problems with this function
function createNewDraft() {
    console.log("Create Draft - create draft in drafts.ts");
    console.log(draftStore.drafts);
    newTaskDialogFlag.value = false;
}
// Problems with this function

function approveAllDrafts() {
    approveAllDialogFlag.value = false;
    console.log(
        "Approve All - API calls to save into database and delete drafts"
    );
    draftStore.approveAllDrafts();

    // snackbarMessage.value = "All Tasks Approved!";
    // snackbarColor.value = "success";
    // snackbar.value = true;

    toastSeverity.value = "success";
    toastSummary.value = "All Tasks Approved!";
    showBottomRight(toastSeverity.value, toastSummary.value);
}

function oneTaskApproved() {
    // snackbarMessage.value = "Task Approved!";
    // snackbarColor.value = "success";
    // snackbar.value = true;

    toastSeverity.value = "success";
    toastSummary.value = "Task Approved!";
    showBottomRight(toastSeverity.value, toastSummary.value);
}

function oneTaskDeleted() {
    // snackbarMessage.value = "Task Deleted!";
    // snackbarColor.value = "error";
    // snackbar.value = true;

    toastSeverity.value = "warn";
    toastSummary.value = "Task Deleted!";
    showBottomRight(toastSeverity.value, toastSummary.value);
}

function oneTaskEdited() {
    // snackbarMessage.value = "Task Edited!";
    // snackbarColor.value = "warning";
    // snackbar.value = true;

    toastSeverity.value = "info";
    toastSummary.value = "Task Edited!";
    showBottomRight(toastSeverity.value, toastSummary.value);
}



// 2. Define a reusable function to set the context
const updateChatContext = () => {
    // Directly access the store's state to get the most current data
    const drafts = draftStore.drafts;
    if (drafts && drafts.length > 0) {
        chatbotStore.setPageContext(drafts, 'Manager Review Page');
        console.log("Chatbot context SET for Manager Review page.");
    } else {
        // We don't clear the context here to prevent flickering while data might be loading.
        // onUnmounted will handle the final cleanup.
        console.log("No drafts available to set as context yet.");
    }
};

// 3. Watch for changes in the data
// This handles the case where data loads AFTER the component has already mounted.
watch(() => draftStore.drafts, () => {
    updateChatContext();
}, {
  deep: true // Important for watching arrays of objects
});

// 4. Use onMounted to set the context as soon as the component is on the page
// This handles cases where the data is already in the store from a previous visit.
onMounted(() => {
    updateChatContext();
});

// 5. Use onUnmounted to clean up when leaving the page
onUnmounted(() => {
  chatbotStore.clearPageContext();
  console.log("Chatbot context CLEARED.");
});

</script>

<style scoped>
.fill-height {
    height: 100%;
    /* Make sure it fills the full screen */
}

.card-1 {
    border: thin solid lightgray;
    box-shadow: none;
}
</style>
