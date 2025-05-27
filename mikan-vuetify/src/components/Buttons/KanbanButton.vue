<template>
  <v-tooltip location="left">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        fab
        size="x-large"
        color="primary"
        dark
        class="action-button-style"
        @click="handleClick"
      >
        <v-icon>mdi-view-dashboard-outline</v-icon>
      </v-btn>
    </template>
    <span>View on Kanban Board</span>
  </v-tooltip>
</template>

<script setup>
const emit = defineEmits(['action']);
const handleClick = () => {
  console.log('ViewKanbanButton clicked');
  emit('action', { type: 'viewKanban' });
};
</script>

<style scoped>
.action-button-style {
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 
              0px 6px 10px 0px rgba(0,0,0,0.14), 
              0px 1px 18px 0px rgba(0,0,0,0.12);
}
</style>