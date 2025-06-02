<template>
    <div class="board-row mb-12">
      <div class="board-header" :style="headerStyle">
        {{ title }}
      </div>
      <v-slide-group show-arrows class="py-4">
        <v-slide-group-item v-for="(card,i) in cards" :key="i">
          <v-card class="mr-4" style="width:200px">
            <v-sheet :color="card.color" class="pa-2 white--text">
              <div class="font-weight-medium">{{ card.header }}</div>
            </v-sheet>
            <v-card-text>
              <div class="text-subtitle-2">{{ card.title }}</div>
              <div class="text-caption grey--text">{{ card.date }}</div>
              <div class="text-body-2">{{ card.description }}</div>
            </v-card-text>
            <v-divider />
            <v-list-item v-for="n in card.items" :key="n" class="pa-2" />
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </template>
  <script>
  console.log("KanbanRow is being called!!!")
  export default {
    name: 'KanbanRow',
    props: {
      title: String,
      cards: Array,
      headerColor: { type: String, default: '#ff7043' }
    },
    computed: {
      headerStyle() {
        return { background: this.headerColor, borderRadius: '8px 0 8px 0' }
      }
    }
  }
  </script>