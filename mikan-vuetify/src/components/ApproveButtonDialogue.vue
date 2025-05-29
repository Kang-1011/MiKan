<template>
  <v-container>
    <v-btn
      icon
      color="success"
      size="60"
      class="mr-1 position-fixed bottom-0 right-0 mb-4 mr-4"
      @click="dialog = true"
    >
      <v-icon size="60">mdi-check</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px" align="center">
      <v-card>
        <v-card-title class="text-headline pa-2">Approve Action</v-card-title>
        <div class="icon-container">
          <v-icon size="50" class="tick-icon">mdi-check</v-icon>
        </div>
        <v-card-subtitle class="pa-2">
          Are you sure you want to approve this action?<br />This cannot be
          undone.
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="approve">Approve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const dialog = ref(false);
const emit = defineEmits(["approve"]);
const confirmApprove = () => {
  dialog.value = true;
};
const approve = () => {
  emit("approve");
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
  margin-bottom: 16px;
}

.tick-icon {
  border: 6px solid red;
  border-radius: 50%;
  padding: 30px;
  color: red;
  cursor: pointer;
}
</style>
