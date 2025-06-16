import { defineStore } from "pinia";

// Working Version (1700 12 Jun 25)
// interface DraftCreate {
//   title: string;
//   dueDate: string;
//   assignee: string;
//   description: string;
// }

// export const useDraftStore = defineStore("draft", {
//   state: () => ({
//     drafts: [],
//   }),

//   getters: {},

//   actions: {
//     addDraft(newDraft: DraftCreate) {
//       this.drafts.push(newDraft);
//     },
//   },
// });
// Working Version (1700 12 Jun 25)

interface DraftCreate {
  id: number;
  title: string;
  dueDate: string;
  assignee: string;
  description: string;
}

export const useDraftStore = defineStore("draft", {
  state: () => ({
    // Initialize drafts as an array of DraftCreate objects
    drafts: [] as DraftCreate[],
  }),

  getters: {},

  actions: {
    addDraft(newDraftData: Omit<DraftCreate, "id">) {
      const draftWithId: DraftCreate = {
        id:
          this.drafts.length > 0
            ? Math.max(...this.drafts.map((draft) => draft.id)) + 1
            : 1,
        ...newDraftData,
      };
      this.drafts.push(draftWithId);
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
      console.log("Hello")
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
