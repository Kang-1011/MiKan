<template>
  <v-tooltip location="left">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        fab
        size="x-large"
        dark
        class="action-button-style"
        @click="handleClick"
      >
        <v-icon>mdi-file-document-outline</v-icon>
      </v-btn>
    </template>
    <span>Minutes</span>
  </v-tooltip>
</template>

<script setup>
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter();
const emit = defineEmits(["action"]);
const handleClick = () => {
  console.log("Minutes clicked");
  emit("action", { type: "minutes" });
  router.push("/MinutesHomepage");
};
</script>

<style scoped>
.v-btn {
  background-color: #ff3d00;
  border-radius: 9999px;
  color: white;
}

.action-button-style {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
