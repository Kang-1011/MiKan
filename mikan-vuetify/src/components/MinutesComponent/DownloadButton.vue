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
        <v-icon>mdi-download-outline</v-icon>
      </v-btn>
    </template>
    <span>Download</span>
  </v-tooltip>
</template>

<script setup>
const emit = defineEmits(['action']);
const handleClick = () => {
  console.log('Download clicked');
  emit('action', { type: 'download' });
};
</script>

<style scoped>
.v-btn {
  background-color: #FF3D00;
}

.action-button-style {
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 
              0px 6px 10px 0px rgba(0,0,0,0.14), 
              0px 1px 18px 0px rgba(0,0,0,0.12);
}
</style>