<template>
  <v-container>
    <v-card
      max-width="400"
      class="d-flex align-end bg-surface-variant pa-2 rounded"
    >
      <createDialog align="center" v-model="showDialog" />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import createDialog from "./createNewKanbanTaskButton.vue";
import createNewKanbanTaskDialog from "./createNewKanbanTaskDialog";

const showDialog = ref(false);

const cards = ref([]);
function addCard(newCard) {
  cards.value.push(newCard);
}
</script>
