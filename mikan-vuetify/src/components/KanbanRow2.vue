<template>
    <div class="kanban-row">
      <!-- loop cards as before -->
      <div
        v-for="card in cards"
        :key="card.header"
        class="kanban-column"
        :style="{ '--column-color': card.color }"
      >
        <!-- still show the card header -->
        <div class="column-header">
          {{ card.header }}
        </div>
  
        <!-- NEW: loop over each task inside the card -->
        <div class="tasks">
          <div
            v-for="(task, idx) in card.tasks"
            :key="task.id || idx"
            class="task-card"
          >
            <div class="task-card-header">
              <strong>{{ task.title }}</strong>
              <small>{{ task.date }}</small>
            </div>
            <p class="task-desc">{{ task.description }}</p>
          </div>
        </div>
  
        <!-- optional: button to add another task -->
        <button @click="$emit('add-task', card)">
          + Add Task
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    cards: {
      type: Array,
      required: true,
      /* each card should look like:
      {
        header: String,
        color: String,
        tasks: [
          { title, date, description,  …  },
          …
        ]
      }
      */
    }
  });
  </script>
  
  <style scoped>
  .kanban-column {
    /* example: using CSS variable to color the column header */
    --header-bg: var(--column-color, #ccc);
  }
  .column-header {
    background: var(--header-bg);
    /* … */
  }
  /* rest of your styles… */
  </style>
  