<!-- // ========================
// TaskCard.vue
// ======================== -->
<!--  -->
<template>
  <v-card class="pa-3 rounded-v2 task-card-1 border-1 mb-3" elevation="0">
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
    <div v-if="task.description" class="text-body-2 clamp-4-lines">
  {{ task.description }}
</div>

    <!-- Due Date + Assignee -->

    <div class="d-flex justify-space-between align-center">
 
      <div class="d-flex align-self-end text-caption">
        <v-icon size="16" class="me-1">mdi-calendar-blank</v-icon>
        {{ formatDate(task.dueDate) }}
      </div>
      <v-spacer/>

      <div v-if="!filterByAssignee" class="text-caption align-self-end font-italic mr-4">
        {{ task.assignee }}
      </div>
      <v-btn
        icon="mdi-auto-fix"
        size="x-small"
        variant="tonal"
        class="mt-2"
        @click.stop="runAutostart"
        :loading="isAutostartRunning"
      >
      </v-btn>

    </div>

  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'

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

const emit = defineEmits(['update-task'])
const isAutostartRunning = ref(false)

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

async function runAutostart() {
  isAutostartRunning.value = true
  console.log(`Running autostart for task ${props.task.id}`)
  try {
    const taskString = `Task Title: ${props.task.title}\nDescription: ${props.task.description}\nAssignee: ${props.task.assignee}\nDue Date: ${props.task.dueDate}`
    const response = await axios.post('http://127.0.0.1:8000/autostart/generate-autostart/', {
      task_string: taskString,
      task_id: props.task.id
    })
    const result = response.data
    console.log(`Received autostart result for task ${props.task.id}:`, result)

    if (result && !result.error) {
      const updatedTask = { ...props.task }
      if (!updatedTask.autostart) {
        updatedTask.autostart = []
      }
      console.log(`Adding autostart entry for task ${props.task.id}:`, result)
      updatedTask.autostart.push({
        name: result.title,
        url: result.url,
        type: result.type
      })
      emit('update-task', updatedTask)
    } else {
      console.error(`Error processing task ${props.task.id}: ${result.error}`)
    }
  } catch (error) {
    console.error(`An error occurred during autostart for task ${props.task.id}:`, error)
  } finally {
    isAutostartRunning.value = false
  }
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