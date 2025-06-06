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
</style>