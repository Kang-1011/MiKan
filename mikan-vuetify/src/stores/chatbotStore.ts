import { defineStore } from 'pinia';
import axios from 'axios';

// --- Type Definitions ---
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
interface PageContext {
  name: string;
  data: any;
}
interface ChatbotState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  currentPageContext: PageContext | null;
  lastSourceLine: string | null;
}

// --- Store Definition ---
const backendUrl = 'http://127.0.0.1:8000';

export const useChatbotStore = defineStore('chatbot', {
  state: (): ChatbotState => ({
    isOpen: false,
    isLoading: false,
    messages: [],
    currentPageContext: null,
    lastSourceLine: null,
  }),

  actions: {
    toggleChatbot() { this.isOpen = !this.isOpen; },
    setPageContext(contextObject: any, contextName: string) { this.currentPageContext = { name: contextName, data: contextObject }; },
    clearPageContext() { this.currentPageContext = null; },

    async sendMessage(userMessage: string) {
      if (!userMessage || this.isLoading || !this.currentPageContext) {
        if (!this.currentPageContext) {
          this.messages.push({ role: 'assistant', content: "I don't have any page context to answer questions about." });
        }
        return;
      }

      this.isLoading = true;
      this.messages.push({ role: 'user', content: userMessage });
      this.lastSourceLine = null;

      // Add a placeholder for the assistant's response
      this.messages.push({ role: 'assistant', content: "" });

      try {
        const historyToSend = this.messages.slice(0, -2).slice(-6); // Exclude user's latest and the placeholder
 
        const systemMessage = `You are Mikan, a helpful and professional meeting assistant. Your goal is to answer the user's questions based ONLY on the provided "Page Context". Do not use any external knowledge. Keep your answers concise and directly related to the information on the page.`;

        const payload = {
          query: userMessage,
          context: JSON.stringify(this.currentPageContext.data),
          context_name: this.currentPageContext.name, 
          messages: [
            { role: 'system', content: systemMessage },
            ...historyToSend.map(msg => ({ role: msg.role, content: msg.content }))
          ],
        };

        // ✨ Use the Fetch API to handle the stream
        const response = await fetch(`${backendUrl}/chatbot/stream-answer/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.body) {
          throw new Error("Response body is null.");
        }
        
        // ✨ Read the stream chunk by chunk
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        const lastMessage = this.messages[this.messages.length - 1];
        
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          // Append each chunk to the assistant's message content
          lastMessage.content += value;
        }

      // Now that the full answer is received, find the citation
      const citationResponse = await axios.post(`${backendUrl}/chatbot/find-citation/`, {
          answer: lastMessage.content,
          context: payload.context,
      });

      if (citationResponse.data && citationResponse.data.sourceLine) {
          let source = citationResponse.data.sourceLine;
          
          // ✅ START: NEW ROBUST HANDLING
          // Check for multiple timestamps, which indicate multiple lines
          const timestamps = source.match(/\[\d{2}:\d{2}:\d{2}\]/g);

          if (timestamps && timestamps.length > 1) {
              console.warn("Multiple citation lines received from backend. Using the first one.");
              // Split the string at the second timestamp and keep only the first part
              source = source.substring(0, source.indexOf(timestamps[1])).trim();
          }
          // ✅ END: NEW ROBUST HANDLING

          this.lastSourceLine = source;
      }

      } catch (error) {
        console.error("Chatbot API error:", error);
        this.messages[this.messages.length - 1].content = "Sorry, I encountered an error getting a response.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});