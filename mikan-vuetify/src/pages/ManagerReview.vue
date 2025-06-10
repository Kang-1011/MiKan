<!-- <template>
  <v-app>
    <Sidebar />
    <NavbarManagerReview />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="task in tasks" :key="task.id">
            <TaskDraft
              :id="task.id"
              :description="task.description"
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

// const tasks = ref(
//   Array(20)
//     .fill()
//     .map((_, index) => ({
//       id: index + 1,
//       title: `Task ${index + 1}`,
//       dueDate: "2025-05-30",
//       assignee: "Team Member",
//       description: "Task description...",
//     }))
// );

// const tasks = ref(
//   Array(20)
//     .fill()
//     .map((_, index) => ({
//       id: index + 1,
//       title: `Task ${index + 1}`,
//       dueDate: "2025-05-30",
//       assignee: "Team Member",
//       description: "Task description...",
//     }))
// );

const tasks =
  reactive[
    ({
      id: 1,
      title: "Task 1",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 2,
      title: "Task 2",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 3,
      title: "Task 3",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    },
    {
      id: 4,
      title: "Task 4",
      dueDate: "2025-05-30",
      assignee: "Team Member",
      description: "Task description...",
    })
  ];

const clearTasks = () => {
  tasks.value = [];
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

function addTaskToList() {}
</script> -->

<template>
  <Sidebar />
  <ManagerReviewNavbar />
  <v-row>
    <v-col>
      <TaskDraft />
    </v-col>
  </v-row>
</template>

<script setup></script>
