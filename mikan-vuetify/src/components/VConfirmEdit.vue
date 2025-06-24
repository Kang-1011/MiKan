<template>
  <div class="confirm-edit-wrapper">
    <!-- 
      The input control is now passed from the parent via a scoped slot.
      This allows us to use any input, like v-textarea, not just v-text-field.
      'internalModel' is the temporary state for the input to bind to.
    -->
    <slot name="input" :model="internalModel" />

    <!-- Action buttons are now more prominent and clear -->
    <div class="button-group mt-4 d-flex justify-end"> 
      <v-btn color="#e0e0e0" variant="flat" @click="save">Save Changes</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  /**
   * The initial value to be edited.
   */
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['save', 'cancel']);

// Internal state to hold edits. This prevents changing the original data
// until the user confirms by clicking "Save".
const internalModel = ref({ value: props.modelValue });

/**
 * Watch for external changes to the modelValue.
 * This ensures that if the data is refreshed from another source,
 * our editing component gets the latest version.
 */
watch(() => props.modelValue, (newVal) => {
  internalModel.value.value = newVal;
}, { immediate: true });

/**
 * Emits the 'save' event with the new value. The parent component
 * is responsible for updating the actual data store.
 */
function save() {
  emit('save', internalModel.value.value);
}

/**
 * Emits the 'cancel' event. The parent component is responsible
 * for hiding this component and discarding the changes.
 */
function cancel() {
  emit('cancel');
}
</script>

<style scoped>
/* Scoped styles for the wrapper and buttons */
.confirm-edit-wrapper {
  width: 100%;
}
.button-group {
  gap: 8px;
}
</style>