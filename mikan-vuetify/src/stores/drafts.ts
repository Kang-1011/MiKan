import { defineStore } from "pinia";
import { reactive } from "vue";

interface DraftCreate {
  title: string;
  dueDate: string;
  assignee: string;
  description: string;
}

// export const useDraftStore = defineStore("draft", {
//   state: () => ({
//     drafts: [],
//   }),

//   getters: {},

//   actions: {
//     addDraft(newDraft: DraftCreate) {
//       state.drafts.push(newDraft);
//     },
//   },
// });

export const useDraftStore = defineStore("draft", () => {
  const drafts = reactive([] as DraftCreate[]);

  function getDraft(index: number) {
    return drafts[index].assignee;
  }

  function addDraft(newDraft: DraftCreate) {
    // console.log("Title", newDraft.title);
    drafts.push(newDraft);
  }
  return { drafts, addDraft };
});
