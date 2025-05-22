<template>
  <v-app>
    <Sidebar />
    <Navbar />
    <v-main>
      <!-- Your main content here -->
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
