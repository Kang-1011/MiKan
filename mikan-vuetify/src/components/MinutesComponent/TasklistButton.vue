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
        <v-icon size="50">mdi-format-list-checkbox</v-icon>
      </v-btn>
    </template>
    <span>View Task List</span>
  </v-tooltip>
</template>

<script setup>
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter();
const emit = defineEmits(["action"]);
const handleClick = () => {
  console.log("Task list clicked");
  emit("action", { type: "tasklist" });
  router.push("/ManagerReview");
};
</script>

<style scoped>
.v-btn {
  background-color: #ff3d00;
  height: 100px !important;
  width: 100px;
  border-radius: 100%;
  color: white;
}

.action-button-style {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
