<template>
  <div class="action-buttons-container">
    <div class="button-slot-item">
      <slot name="top-button">
        </slot>
    </div>

    <div class="middle-buttons-group">
      <div class="button-slot-item">
        <slot name="middle-button-1"></slot>
      </div>
      <div class="button-slot-item">
        <slot name="middle-button-2"></slot>
      </div>
      <div class="button-slot-item">
        <slot name="middle-button-3"></slot>
      </div>
      <div class="button-slot-item">
        <slot name="middle-button-4"></slot>
      </div>
    </div>

    <div class="button-slot-item">
      <slot name="bottom-button"></slot>
    </div>
  </div>
</template>

<script setup>
// No props or internal button logic needed here anymore for button definitions.
// The parent component will provide the actual buttons.
import { onMounted } from 'vue';

onMounted(() => {
  console.log('ActionButtonsBar.vue (slot-based) mounted.');
});
</script>

<style scoped>
.action-buttons-container {
  background-color: #EBEBEB; 
  position: relative;
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 24px 0; /* Defines space for top/bottom buttons from container edges */
  box-sizing: border-box;
  justify-content: space-between; /* Distributes: TopButton, MiddleGroup, BottomButton */
}

.middle-buttons-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* Space BETWEEN the 4 middle buttons. Adjust for "a little space" */
  /* This group will be compact. Its position is determined by the parent's justify-content. */
}

.button-slot-item {
  /* This class is a wrapper for each slot to ensure consistent alignment if needed,
     though individual button components will mostly control their appearance.
     It also helps in targeting if you need to apply styles to the slot wrappers.
  */
  display: flex; /* Helps if the slotted component is just a button */
  justify-content: center; /* Centers the button if the slot wrapper is wider */
  width: 100%; /* Ensures the slot wrapper takes available width for centering */
}

/* The .action-button class is removed from here as individual buttons
   passed into slots will have their own styling (including shadows). */
</style>