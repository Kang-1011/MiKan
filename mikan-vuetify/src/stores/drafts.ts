// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import axios from 'axios';

// interface Draft {
//   id: number;
//   title: number;
//   description: string;
//   dueDate: string;
//   assignee: number;
//   project: string;
//   approved: boolean;
// }

// export const useDraftStore = defineStore('drafts', () => {
//   const drafts = ref<Draft[]>([]);

//   const loadDrafts = async () => {
//     try {
//       const response = await axios.get<Draft[]>('http://127.0.0.1:8000/drafts/drafts');
//       drafts.value = response.data;
//       console.log("Drafts loaded:", drafts.value);
//     } catch (error) {
//       console.error("Failed to fetch drafts:", error);
//     }
//   };

//   return {
//     drafts,
//     loadDrafts,
//   };
// });

// src/stores/drafts.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface Draft {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  assignee: number;
  project: number;
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

  const addNewDraft = async (draftData: {
    title: string;
    description: string;
    dueDate: string;
    assignee: number;
    project: number;
    approved: boolean;
  }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/drafts/add_draft', {
        title: draftData.title,
        description: draftData.description,
        due_date: draftData.dueDate,  // match FastAPI field
        assignee_id: draftData.assignee,
        project_id: draftData.project,
        approved: draftData.approved,
      });

      console.log("Draft created:", response.data);

      // Optionally reload or append to local state
      await loadDrafts(); // OR drafts.value.push(response.data)

    } catch (error) {
      console.error("Failed to create draft:", error);
    }
  };

  return {
    drafts,
    loadDrafts,
    addNewDraft,
  };
});
