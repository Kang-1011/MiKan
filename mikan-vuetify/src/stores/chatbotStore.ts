// ====================================================================
// File: src/stores/chatbotStore.ts
// --------------------------------------------------------------------
// This is the TypeScript version of your Pinia store. It adds type
// safety to your state, actions, and the data payloads.
// ====================================================================

import { defineStore } from 'pinia';
import axios from 'axios';

// --- Type Definitions ---
// Define interfaces for the objects in our state for type safety.

// Defines the structure for each message in the chat history.
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Defines the structure for the context object passed from each page.
// The `data` property is `any` because the context can be any object
// (minutes, task list, kanban data, etc.).
interface PageContext {
  name: string;
  data: any;
}

// Defines the structure of the entire chatbot store's state.
interface ChatbotState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  currentPageContext: PageContext | null;
}

// --- Store Definition ---

const backendUrl = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

// Use the `defineStore` function with a typed state.
export const useChatbotStore = defineStore('chatbot', {
  // The state is now a function that returns an object matching the ChatbotState interface.
  state: (): ChatbotState => ({
    isOpen: false,
    isLoading: false,
    messages: [],
    currentPageContext: null,
  }),

  // Actions can remain largely the same, but TypeScript will now infer
  // the types of `this` based on the state definition.
  actions: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },

    /**
     * Sets the context from the current page for the chatbot to use.
     * @param contextObject The data object from the page (e.g., minutes, tasks).
     * @param contextName A descriptive name for the page context (e.g., 'Minutes Page').
     */
    setPageContext(contextObject: any, contextName: string) {
      this.currentPageContext = {
        name: contextName,
        data: contextObject,
      };
    },

    /**
     * Clears the page context, typically when the user navigates away from a page.
     */
    clearPageContext() {
      this.currentPageContext = null;
    },

    /**
     * Sends a user's message and the current page context to the backend API.
     * @param userMessage The message typed by the user.
     */
    async sendMessage(userMessage: string) {
      if (!userMessage || this.isLoading || !this.currentPageContext) {
        if (!this.currentPageContext) {
            console.warn("Chatbot sendMessage called without page context.");
            this.messages.push({ role: 'assistant', content: "I don't have any page context to answer questions about. Please navigate to a page with content." });
        }
        return;
      }

      this.isLoading = true;
      this.messages.push({ role: 'user', content: userMessage });

      try {
        // The payload sent to the backend.
        const payload = {
          query: userMessage,
          // We stringify the data to send it as a clean JSON payload.
          context: JSON.stringify(this.currentPageContext.data),
          context_name: this.currentPageContext.name
        };

        const response = await axios.post<{ answer: string }>(`${backendUrl}/chat-with-context/`, payload);

        this.messages.push({ role: 'assistant', content: response.data.answer });
      } catch (error) {
        console.error("Chatbot API error:", error);
        this.messages.push({ role: 'assistant', content: "Sorry, I encountered an error. Please try again." });
      } finally {
        this.isLoading = false;
      }
    },
  },
});