<template>
    <Sidebar></Sidebar>

    <v-main style="height: 100vh" class="pa-3 ">
        <v-card class="fill-height rounded-v1 border-1" flat>
            <v-card border="0" flat style="height:100%; overflow-y: auto;">
                <MinuteDisplay   /> 
            </v-card>
        </v-card>
    </v-main>
    <Chatbot />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hasUnsavedChanges = ref(true) // Set this based on actual logic

function handleBeforeUnload(event) {
  if (hasUnsavedChanges.value) {
    event.preventDefault()
    event.returnValue = '' // Required for Chrome to trigger prompt
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped>
.fill-height {
    height: 100%;
}

.card-1 {
    border: thin solid lightgray;
    box-shadow: none;
}
</style>