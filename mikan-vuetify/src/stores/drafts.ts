// src/stores/drafts.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

// Draft type based on your FastAPI DraftOut schema
interface Draft {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  assignee: string;
  project: string;
  approved: boolean;
}

export const useDraftStore = defineStore('drafts', () => {
  const drafts = ref<Draft[]>([]);

  const loadDrafts = async () => {
    try {
      const response = await axios.get<Draft[]>('http://127.0.0.1:8000/drafts');
      drafts.value = response.data;
      console.log("Drafts loaded:", drafts.value);
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    }
  };

  const approveAllDrafts = () => {
    drafts.value = [];
    // Later: Add API logic to persist approval
  };

  const addDraft = (newDraft: Draft) => {
    drafts.value.push(newDraft);
  };

  const updateDraft = (updatedDraft: Draft) => {
    const index = drafts.value.findIndex(d => d.id === updatedDraft.id);
    if (index !== -1) {
      drafts.value[index] = updatedDraft;
    }
  };

  const deleteDraft = (id: number) => {
    drafts.value = drafts.value.filter(d => d.id !== id);
  };

  return {
    drafts,
    loadDrafts,
    approveAllDrafts,
    addDraft,
    updateDraft,
    deleteDraft
  };
});
