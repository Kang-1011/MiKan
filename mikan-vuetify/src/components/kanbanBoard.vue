<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card title="To do" align="center"></v-card>
        <kanbanList> </kanbanList>
      </v-col>
      <v-col>
        <kanbanList></kanbanList>
      </v-col>
      <v-col>
        <kanbanList></kanbanList>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import kanbanList from "./kanbanList";
// import VuetifyTaskModal6 from "./VuetifyTaskModal6";
</script>
