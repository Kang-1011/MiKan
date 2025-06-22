<template>
  <v-container class="topbar" fluid>
    <div class="topbar-inner d-flex align-center justify-space-between">
      <div class="custom-title">{{ title }}</div>
      <div class="mikan-text">MIKAN.AI</div>
    </div>
  </v-container>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Insert Your Title, Bro",
  },
});
</script>

<style scoped>
.topbar {
  border-radius: 12px;
  background-color: #ff3d00;
  height: 64px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.topbar-inner {
  height: 100%;
  padding: 0 24px;
}

.custom-title {
  font-weight: bold;
  font-size: 24px;
  color: white;
}

.mikan-text {
  font-weight: bold;
  font-size: 24px;
  color: white;
}
</style>
