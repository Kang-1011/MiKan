<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-card align="center" class="bg-white pa-2" rounded="xl">
        <v-icon color="red" size="150" border>mdi-close</v-icon>
        <v-card-title>Delete task {{ task }}?</v-card-title>
        <v-card-text>Deleted task will be gone forever</v-card-text>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn color="red" size="x-large" rounded="lg">Delete</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn size="x-large" rounded="lg">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
</script>
