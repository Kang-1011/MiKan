<!-- <template>
  <v-container>
    <createNew @save="addCard" v-model="crateNewTask"> </createNew>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4" >
        <v-card>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>{{ card.description }}</v-card-text>
          <v-btn icon @click="details">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <detailInformation />
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      class="ma-2"
      icon
      color="yellow-darken-2"
      size="35"
      @click="crateNewTask = true"
    >
      <v-icon size="25">mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import createNew from "./createNewKanbanTaskDialog";
import detailInformation from "./VuetifyTaskModal6";
const dialog = ref(false);
const cards = ref([]);

function addCard(newCard) {
  cards.value.push(newCard);
}

const crateNewTask = ref(false);
</script> -->

<template>
  <v-container>
    <createNew @save="addCard" v-model="crateNewTask"> </createNew>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
        <v-card @click="openTaskDialog(card)">
          <v-card-title align="left">{{ card.title }}</v-card-title>
          <v-card-text align="left">Due date: {{ card.dueDate }}</v-card-text>
          <v-card-text align="left">Assignee: {{ card.assignee }}</v-card-text>
          <v-card-text
            ><v-card>
              {{ card.description }}
            </v-card>
          </v-card-text>
          <detailInformation />
        </v-card>
        <TaskDialog v-model="dialogVisible" :task="selectedTask" />
      </v-col>
    </v-row>
    <v-btn
      class="ma-2"
      icon
      color="yellow-darken-2"
      size="35"
      @click="crateNewTask = true"
    >
      <v-icon size="25">mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import createNew from "./createNewKanbanTaskDialog";
import detailInformation from "./VuetifyTaskModal6";
import TaskDialog from "./VuetifyTaskModal6.vue";

const selectedTask = ref(null);
const dialogVisible = ref(false);
const dialog = ref(false);
const cards = ref([]);

function openTaskDialog(card) {
  selectedTask.value = card;
  dialogVisible.value = true;
}
function addCard(newCard) {
  cards.value.push(newCard);
}

const crateNewTask = ref(false);
</script>
