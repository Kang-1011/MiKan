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
          due_date: draftData.dueDate,
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

    async editDraft(draftId: number, draftData: {
      title: string;
      description: string;
      dueDate: string;
      assignee: number;
      project: number;
    }) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/drafts/update_draft/${draftId}`, {
          title: draftData.title,
          description: draftData.description,
          due_date: draftData.dueDate,
          assignee_id: draftData.assignee,
          project_id: draftData.project,
        });
        console.log("Draft modified:", response.data);    
        const index = this.drafts.findIndex(d => d.id === draftId);
        if (index !== -1) {
          this.drafts[index] = response.data;
        }
      } catch (error) {
        console.error("Failed to modify draft:", error);
      }
    },

    // async approveOneDraft(draftId: number) {
    //   try {
    //     const response = await axios.put(`http://127.0.0.1:8000/drafts/approve_draft/${draftId}`, {
    //       approved: true,
    //     });
    //     const index = this.drafts.findIndex(d => d.id === draftId);
    //     if (index !== -1) {
    //       this.drafts[index] = response.data;
    //     }
    //   } catch (error) {
    //     console.error(`Failed to approve draft ${draftId}:`, error);
    //   }
    // },

    async approveOneDraft(draftId: number) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/drafts/approve_draft/${draftId}`, {
          approved: true,
        });
        const index = this.drafts.findIndex(d => d.id === draftId);
        if (index !== -1) {
          this.drafts[index] = response.data;
        }
      } catch (error) {
        console.error(`Failed to approve draft ${draftId}:`, error);
      }
    },    

    async approveAllDrafts() {
      try {
        const response = await axios.put('http://127.0.0.1:8000/drafts/approve_all_drafts', {
          approved: true,
        });
    
        this.drafts = this.drafts.map(draft => ({
          ...draft,
          approved: true,
        }));
        console.log("All drafts approved:", response.data);
        await this.fetchFromAPI();
      } catch (error) {
        console.error("Failed to approve drafts:", error);
      }
    },    

    getDraftById(id: number): DraftCreate | undefined {
      return this.drafts.find(draft => draft.id === id);
    },
  },
});