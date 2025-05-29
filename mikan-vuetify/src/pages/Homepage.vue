<template> 
    <Sidebar />
    <MyAppBar />  
    <v-app>
    <v-main>

      <Lightbulb />
    <AudioConverter />
    </v-main></v-app>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import AudioConverter from "../components/AudioConverter.vue";
</script>
