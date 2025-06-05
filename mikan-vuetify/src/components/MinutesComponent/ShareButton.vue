<template>
  <v-tooltip location="left">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        fab
        size="x-large" 
        dark
        class="action-button-style"
        @click="dialog = true"
      >
        <v-icon>mdi-share-variant-outline</v-icon>
      </v-btn>

      
    <v-dialog v-model="dialog" max-width="500px" align="center">
      <v-card>
        <v-card-title class="text-headline pa-2">Share Item</v-card-title>
        <div class="icon-container">
          <v-icon size="50" class="close-icon">mdi-share-variant-outline</v-icon>
        </div>
        <v-card-subtitle class="pa-2">
          Are you sure you want to share this item? 
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  style="background-color: grey;" text @click="dialog = false">Cancel</v-btn>
          <v-btn   text @click="shareItem">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </template>
    <span>Share</span>
  </v-tooltip>
</template>

<script setup>

import { ref, defineProps, defineEmits } from "vue";
const dialog = ref(false);
const emit = defineEmits(["share-task"]);

function shareItem() {
  console.log("Item share");
  dialog.value = false;
}
const shareTask = () => {
  emit("share-task", props.taskIndex);
  dialog.value = false;
};
</script>

<style scoped>
.v-btn {
  background-color: #FF3D00;
  border-radius:  9999px;
}

.action-button-style {
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 
              0px 6px 10px 0px rgba(0,0,0,0.14), 
              0px 1px 18px 0px rgba(0,0,0,0.12);
}



.headline {
  font-weight: bold;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px; /* Adjust as needed */
}

.close-icon {
  border: 6px solid red;
  border-radius: 50%;
  padding: 30px;
  color: red;
  cursor: pointer;
}
</style>