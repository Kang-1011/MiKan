<template>
  <v-app>
    <Sidebar class="position-fixed"/>
    <NavbarManagerReview class="position-fixed"/>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(item, index) in tasks"
            :key="index"
          >
            <TaskDraft
              :task-data="item"
              :task-index="index"
              @delete-task="deleteTask"
            ></TaskDraft>
          </v-col>
        </v-row>
      </v-container>
      <ApproveButtonDialogue @approve="clearTasks"></ApproveButtonDialogue>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import NavbarManagerReview from "../components/NavbarManagerReview.vue";
import TaskDraft from "../components/TaskDraft.vue";
import ApproveButtonDialogue from "../components/ApproveButtonDialogue";

// const tasks = ref(Array(9).fill({}));
const tasks = ref(
  Array(9)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      title: `Task ${index + 1}`,
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    }))
);
const clearTasks = () => {
  tasks.value = [];
};
const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>
