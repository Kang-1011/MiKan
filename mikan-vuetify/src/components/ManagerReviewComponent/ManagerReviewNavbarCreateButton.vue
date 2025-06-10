<template>
  <v-btn color="orange" class="ml-4" @click="dialog = true">Create</v-btn>
  <v-dialog v-model="dialog">
    <ManagerReviewNavbarCreateTaskDialog @close-dialog="dialog = false" />
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const dialog = ref(false);
</script>
