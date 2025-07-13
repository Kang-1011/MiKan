import { ref } from 'vue';
import { defineStore } from "pinia";
import axios from 'axios';

interface Draft {
  id: number;
  title: string;
  description: string;
  due_date: string;
  assignee: number;
  project: number;
  approved: boolean;
}

export const useDraftStore = defineStore("draft", {
  state: () => ({
    drafts: [] as Draft[],
  }),

  getters: {},

  actions: {
    async fetchFromAPI() {
      try {
        const response = await axios.get("http://localhost:8000/drafts");
        const data = response.data;
    
        // Map snake_case to camelCase
        this.drafts = data.map((draft: any) => ({          
          id: draft.id,
          title: draft.title,
          description: draft.description,
          dueDate: draft.due_date,
          assignee: draft.assignee,
          project: draft.project,
          approved: draft.approved,
        }));
    
        console.log(this.drafts);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    },
    
    

    // addDraft(newDraftData: Omit<DraftCreate, "id">) {
    //   const draftWithId: DraftCreate = {
    //     id:
    //       this.drafts.length > 0
    //         ? Math.max(...this.drafts.map((draft) => draft.id)) + 1
    //         : 1,
    //     ...newDraftData,
    //   };
    //   this.drafts.push(draftWithId);
    // },

    async addDraft(draftData: {
      title: string;
      description: string;
      dueDate: string;
      assignee: number;
      project: number;
      approved: boolean;
    }) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/drafts/add_draft', {
          title: draftData.title,
          description: draftData.description,
          due_date: draftData.dueDate,  // Convert camelCase to snake_case
          assignee_id: draftData.assignee,
          project_id: draftData.project,
          approved: draftData.approved,
        });
    
        console.log("Draft created:", response.data);
        this.drafts.push(response.data);
      } catch (error) {
        console.error("Failed to create draft:", error);
      }
    },    
    
    deleteDraft(id: number) {
      const initialLength = this.drafts.length;
      // Filter out the draft with the specified ID
      this.drafts = this.drafts.filter(draft => draft.id !== id);
      if (this.drafts.length < initialLength) {
        console.log(`Draft with ID ${id} deleted.`);
      } else {
        console.warn(`Draft with ID ${id} not found for deletion.`);
      }
    },

    editDraft(id: number, updatedDraftData: Partial<Omit<DraftCreate, 'id'>>) {
      const index = this.drafts.findIndex((draft) => draft.id === id);
      if (index !== -1) {
        this.drafts[index] = { ...this.drafts[index], ...updatedDraftData };
        console.log(`Draft with ID ${id} updated.`);
      } else {
        console.warn(`Draft with ID ${id} not found for editing.`);
      }
    },

    approveAllDrafts() {
      this.drafts = []
    },

    getDraftById(id: number): DraftCreate | undefined {
      return this.drafts.find(draft => draft.id === id);
    },
  },
});