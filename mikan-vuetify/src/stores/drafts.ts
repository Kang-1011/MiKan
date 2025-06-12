import { defineStore } from "pinia";
import { reactive } from "vue";

interface DraftCreate {
  title: string;
  dueDate: string;
  assignee: string;
  description: string;
}

export const useDraftStore = defineStore("draft", {
  state: () => ({
    drafts: [],
  }),

  getters: {},

  actions: {
    addDraft(newDraft: DraftCreate) {
      this.drafts.push(newDraft);
    },
  },
});