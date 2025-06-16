<template>
  <v-dialog max-width="500px" align="center">
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
        <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="red" text @click="approveAllDrafts">Approve</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const emit = defineEmits(["approve-all-drafts", "close-approve-dialog"]);

const closeDialog = () => emit("close-approve-dialog");

const approveAllDrafts = () => {
  emit("approve-all-drafts");
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
