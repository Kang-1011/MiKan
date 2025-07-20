<!-- // ========================
// TaskCard.vue
// ======================== -->
<!--  -->
<template>
  <v-card class="pa-3 rounded-xl border-sm mb-3 bg-grey-lighten-4" elevation="0">
    <!-- Title + Priority -->
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="font-weight-medium text-truncate">{{ task.title }}</div>
      <v-chip
        v-if="task.priority"
        :color="priorityColor"
        size="small"
        variant="tonal"
        class="text-capitalize"
      >
        {{ task.priority }}
      </v-chip>
    </div>

    <!-- Description with Tooltip -->
    <div v-if="task.description" class="text-body-2 mb-2 clamp-4-lines">
  {{ task.description }}
</div>

    <!-- Due Date + Assignee -->
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center text-caption">
        <v-icon size="16" class="me-1">mdi-calendar-blank</v-icon>
        {{ formatDate(task.dueDate) }}
      </div>
      <div v-if="!filterByAssignee" class="text-caption font-italic">
        {{ task.assignee }}
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  filterByAssignee: {
    type: Boolean,
    default: false
  }
})

const priorityColor = computed(() => {
  switch (props.task.priority?.toLowerCase()) {
    case 'critical': return 'red-darken-3'
    case 'high': return 'red'
    case 'medium': return 'orange'
    case 'low': return 'green'
    default: return 'grey'
  }
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return 'No date'
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) // e.g., "20 Jun"
}
</script>

<style>
/* .card-soft {
  border: 2px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 25px;
} */
.card-soft {
  background-color: #fff;
  border-radius: 16px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.06);  /* Stronger shadow for depth */
  transition: box-shadow 0.2s ease, transform 0.1s ease;
  border: 2px solid #f1f1f1;         /* Subtle border to separate on white bg */
}
.clamp-4-lines {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* or 2 if you want shorter */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>