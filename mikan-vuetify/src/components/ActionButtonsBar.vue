<!-- actionbuttonsbar.vue -->
<template>
  <v-navigation-drawer
    permanent
    location="right"
    color="#EBEBEB"
    class="action-bar"
    width="110"
  >  
  <div class="d-flex flex-column fill-height">
       <div class="pa-4 d-flex justify-center">
        <slot name="top-button"></slot>
      </div>
 <v-spacer></v-spacer>
      
       <div class="d-flex flex-column align-center ga-2 mt-4">
        <slot name="middle-button-1"></slot>
        <slot name="middle-button-2"></slot>
        <slot name="middle-button-4"></slot>
      </div>

       <v-spacer></v-spacer>
       <div class="pa-4 d-flex justify-center">
        <slot name="bottom-button"></slot>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('ActionButtonsBar.vue (flush vertical layout) mounted.');
});
</script>

<style scoped>

.action-bar {
  border-left: 1px solid #dcdcdc;
}

.action-buttons-container {
  background-color: #EBEBEB;
  height: 100%; /* Take full height of its parent v-col */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0; /* Vertical padding for the container */
  box-sizing: border-box;
  justify-content: space-between; /* Distributes: TopButton, MiddleGroup, BottomButton */
  overflow: hidden; /* Prevent the container itself from causing scrollbars if padding or content calculation is slightly off */
}

.button-slot-item { /* Wrapper for top and bottom buttons */
  display: flex;
  justify-content: center;
  width: 100%;
  flex-shrink: 0; /* Prevent top/bottom buttons from shrinking if space is tight */
}

.middle-buttons-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* Space BETWEEN the middle buttons */
  overflow-y: auto;   /* Allow this section to scroll vertically if content exceeds available space */
  overflow-x: hidden; /* Prevent horizontal scrollbar */
  width: 100%; /* Ensure it uses available width for centering internal items */
  /* flex-grow: 1; // Optionally allow it to grow if there's extra space, but not strictly needed if space-between is distributing space correctly */
  padding: 10px 0; /* Add some vertical padding within the scrollable area if desired */
}

/* Ensure custom scrollbar styling applies to the middle group if you want it */
.middle-buttons-group::-webkit-scrollbar {
  width: 8px;
}

.middle-buttons-group::-webkit-scrollbar-track {
  background: #D0D0D0; /* Slightly different from container for visibility */
  border-radius: 10px;
}

.middle-buttons-group::-webkit-scrollbar-thumb {
  background-color: #FA3915; /* Your desired thumb color */
  border-radius: 10px;
  border: 2px solid #D0D0D0; /* Padding around thumb */
}
</style>