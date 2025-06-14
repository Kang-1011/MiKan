<template>
  <v-app>
    <Sidebar class="position-fixed" />
    <Topbar title="Manager Review" />
    <v-app-bar app dark flat="">
      <v-spacer></v-spacer>

      <v-btn
        variant="elevated"
        color="yellow"
        class="mr-2"
        @click="openCreateTaskDialog()"
      >
        <v-icon left>mdi-plus</v-icon>
        Create Task
      </v-btn>

      <v-btn
        :disabled="draftStore.drafts.length === 0"
        variant="elevated"
        color="green"
        @click="openApproveAllDialog()"
      >
        <v-icon left>mdi-check</v-icon>
        Approve All
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        v-if="draftStore.drafts.length === 0 && !snackbar"
        fluid
        class="fill-height d-flex align-center justify-center"
      >
        <h2 class="text-center text-black">No drafts found</h2>
      </v-container>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="draft in draftStore.drafts"
            :key="draft.id"
          >
            <TaskDraft
              :taskIndex="draft.id"
              :title="draft.title"
              :dueDate="draft.dueDate"
              :assignee="draft.assignee"
              :description="draft.description"
              @task-approved="oneTaskApproved($event)"
              @task-deleted="oneTaskDeleted($event)"
              @task-edited="oneTaskEdited($event)"
            ></TaskDraft>
          </v-col>
        </v-row>
        <CreateTaskDialog
          v-model="newTaskDialogFlag"
          @close-create-task-dialog="newTaskDialogFlag = false"
          @pass-created-task="createNewDraft()"
        />
        <ApproveAllDialog
          v-model="approveAllDialogFlag"
          @close-approve-dialog="approveAllDialogFlag = false"
          @approve-all-drafts="approveAllDrafts($event)"
        />
        <v-snackbar
          v-model="snackbar"
          :timeout="2500"
          :color="snackbarColor"
          variant="tonal"
          class="justify-center align center"
          location="center middle"
        >
          <h1 class="text-center">{{ snackbarMessage }}</h1>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useDraftStore } from "@/stores/drafts";
import ApproveAllDialog from "@/components/ManagerReviewComponent/ManagerReviewApproveAllDialog.vue";
import CreateTaskDialog from "@/components/ManagerReviewComponent/ManagerReviewCreateTaskDialog.vue";
const newTaskDialogFlag = ref(false);
const approveAllDialogFlag = ref(false);

const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("");

const draftStore = useDraftStore();

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

  snackbarMessage.value = "All Tasks Approved!";
  snackbarColor.value = "success";
  snackbar.value = true;
}

function oneTaskApproved() {
  snackbarMessage.value = "Task Approved!";
  snackbarColor.value = "success";
  snackbar.value = true;
}

function oneTaskDeleted() {
  snackbarMessage.value = "Task Deleted!";
  snackbarColor.value = "error";
  snackbar.value = true;
}

function oneTaskEdited() {
  snackbarMessage.value = "Task Edited!";
  snackbarColor.value = "warning";
  snackbar.value = true;
}
</script>
