<template>
  <v-app>
    <Sidebar />
    <NavbarManagerReview />
    <v-main>
      <!-- Your main content here -->
      <TaskDraft></TaskDraft>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import NavbarManagerReview from "../components/NavbarManagerReview.vue";
import TaskDraft from "../components/TaskDraft.vue";
</script>
