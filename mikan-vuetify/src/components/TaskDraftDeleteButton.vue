<template>
  <v-btn
    icon
    @click="deleteDialog = true"
    color="success"
    variant="flat"
    density="compact"
  >
    <v-icon size="default">mdi-delete</v-icon>
  </v-btn>
  <DeleteButtonDialogue />
</template>

<script setup>
// import DeleteButtonDialogue from "./deleteDialog";
</script>
