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

      <v-btn variant="elevated" color="green" @click="openApproveAllDialog()">
        <v-icon left>mdi-check</v-icon>
        Approve All
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="draft in draftStore.drafts"
            :key="draft.title"
          >
            <TaskDraft
              :title="draft.title"
              :dueDate="draft.dueDate"
              :assignee="draft.assignee"
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

const draftStore = useDraftStore();

function openCreateTaskDialog() {
  newTaskDialogFlag.value = true;
}

function openApproveAllDialog() {
  approveAllDialogFlag.value = true;
}

// Problems with this function
function createNewDraft() {
  console.log("Manager Review - Change this to API calls");
  console.log(draftStore.drafts);
  newTaskDialogFlag.value = false;
}
// Problems with this function

function approveAllDrafts() {
  approveAllDialogFlag.value = false;
  console.log("Approve All - Change this to API calls");
}
</script>
