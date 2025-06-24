import { defineStore } from "pinia";

interface DraftCreate {
  id: number; // (Warning) This needs to be a unique identifier when connected to db
  title: string;
  dueDate: string;
  assignee: string;
  project: string;
  description: string;
}

export const useDraftStore = defineStore("draft", {
  state: () => ({
    // Initialize drafts as an array of DraftCreate objects
    drafts: [
      {
        id: 1,
        title: "Implement User Authentication",
        dueDate: "2024-07-15",
        assignee: "Alice Johnson",
        project: "WebApp Revamp",
        description: "Develop and integrate user login, registration, and password reset functionalities. Ensure secure token handling and session management."
      },
      {
        id: 2,
        title: "Design New Dashboard Layout",
        dueDate: "2024-07-20",
        assignee: "Bob Williams",
        project: "UI/UX Enhancements",
        description: "Create wireframes and high-fidelity mockups for the new administrative dashboard, focusing on data visualization and user experience."
      },
      {
        id: 3,
        title: "API Endpoint for Product Catalog",
        dueDate: "2024-07-25",
        assignee: "Charlie Brown",
        project: "E-commerce Backend",
        description: "Develop RESTful API endpoints for retrieving, adding, updating, and deleting product information, including categories and stock levels."
      },
      {
        id: 4,
        title: "Write Marketing Copy for Q3 Campaign",
        dueDate: "2024-07-10",
        assignee: "Diana Prince",
        project: "Marketing Initiatives",
        description: "Draft compelling marketing copy for email newsletters, social media posts, and website banners for the upcoming Q3 product launch."
      },
      {
        id: 5,
        title: "Database Schema Refactoring",
        dueDate: "2024-08-01",
        assignee: "Eve Davis",
        project: "Database Optimization",
        description: "Analyze existing database schema for inefficiencies and propose refactoring to improve performance and scalability. Requires careful migration planning."
      },
      {
        id: 6,
        title: "Setup CI/CD Pipeline",
        dueDate: "2024-08-05",
        assignee: "Frank Miller",
        project: "DevOps Automation",
        description: "Configure and automate the Continuous Integration and Continuous Deployment pipeline for the main application repository using Jenkins/GitLab CI."
      }
    ] as DraftCreate[],
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
