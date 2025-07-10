// src/stores/drafts.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

// Draft type based on your FastAPI DraftOut schema
interface Draft {
  id: number;
  title: number;
  description: string;
  dueDate: string;
  assignee: number;
  project: string;
  approved: boolean;
}

interface NewDraft{
  assignee_id: number;
  project_id: number;
  title: string;
  description: string;
  due_date: string;
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

  const addDraft = async () => {
    const payload = {
      ...NewDraft,
      approved : false
    }
    console.log("payload: " , payload)
  }

  // async function addNewDraft(NewDraft: NewDraft){
  //   const payload = {
  //     ...NewDraft,
  //     approved : false
  //   }

  //   console.log("payload ", payload)

  //   try{
  //     const response = await axios.post('http://127.0.0.1:8000/add_draft', payload, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Failed to fetch drafts:", error);
  //   }
  // }

  const approveAllDrafts = () => {
    drafts.value = [];
    // Later: Add API logic to persist approval
  };

  // const addDraft = (newDraft: Draft) => {
  //   drafts.value.push(newDraft);
  // };
  


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
    addNewDraft,
    updateDraft,
    deleteDraft
  };
});

