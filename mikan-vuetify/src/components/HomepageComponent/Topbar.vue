<template>
  <v-app-bar app color="#FF3D00">
    <v-toolbar-title class="custom-title">{{ title }}</v-toolbar-title>
    <v-spacer />
    <span class="mikan-text">MIKAN.AI</span>
  </v-app-bar>
</template>

<!-----------------------------Script----------------------------->

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Insert Your Title, Bro",
  },
});
</script>

<!-----------------------------Style----------------------------->

<style scoped>
.custom-title {
  font-weight: bold;
  /* text-transform: uppercase; */
  font-size: 24px;
}

.mikan-text {
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 1px;
  margin-right: 16px;
}
</style>
