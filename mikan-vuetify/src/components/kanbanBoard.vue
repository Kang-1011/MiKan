<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card class="mt-2" title="To do" align="center"></v-card>
        <kanbanList> </kanbanList>
      </v-col>
      <v-col>
        <v-card class="mt-2" title="In progress" align="center"></v-card>
        <kanbanList></kanbanList>
      </v-col>
      <v-col>
        <v-card class="mt-2" title="Done" align="center"></v-card>
        <kanbanList></kanbanList>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import kanbanList from "./kanbanList";
// import VuetifyTaskModal6 from "./VuetifyTaskModal6";
</script>
