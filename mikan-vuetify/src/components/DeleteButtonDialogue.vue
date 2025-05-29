<template>
  <v-container>
    <v-btn
      icon
      color="red-darken-2"
      size="35"
      class="mr-1"
      @click="dialog = true"
    >
      <v-icon size="25">mdi-close</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px" align="center">
      <v-card>
        <v-card-title class="text-headline pa-2">Delete Item</v-card-title>
        <div class="icon-container">
          <v-icon size="50" class="close-icon">mdi-close</v-icon>
        </div>
        <v-card-subtitle class="pa-2">
          Are you sure you want to delete this item?<br />This action cannot be
          undone.
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="deleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const dialog = ref(false);
const emit = defineEmits(["delete-task"]);

function deleteItem() {
  console.log("Item deleted");
  dialog.value = false;
}
const deleteTask = () => {
  emit("delete-task", props.taskIndex);
  dialog.value = false;
};
</script>

<style scoped>
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
