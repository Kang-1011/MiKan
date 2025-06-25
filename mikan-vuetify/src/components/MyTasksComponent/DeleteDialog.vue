<template>
    <v-dialog v-model="internalVisible" max-width="360">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cancel">Cancel</v-btn>
          <v-btn color="red" @click="confirm">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue'
  
  // Declare props
  const props = defineProps({
    modelValue: Boolean,
    title: { type: String, default: 'Confirm Delete' },
    message: { type: String, default: 'Are you sure?' }
  })
  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
  
  // Internal v-model proxy
  const internalVisible = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
  })
  
  function confirm() {
    emit('confirm')
    internalVisible.value = false
  }
  
  function cancel() {
    emit('cancel')
    internalVisible.value = false
  }
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  