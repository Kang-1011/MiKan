<template>
  <div>
    <v-btn
      icon
      color="blue-darken-4"
      @click="approve"
      variant="flat"
      density="compact"
    >
      <v-icon class="align-center justify-center" size="default"
        >mdi-check</v-icon
      >
    </v-btn>
  </div>
</template>

<script setup>
const emit = defineEmits(["approved"]);
function approve() {
  emit("approved");
}
</script>
