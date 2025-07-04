 
<!-- File: src/components/ContextualChatbot.vue (Styled Version) -->
<template>
  <div>
    <!-- Launcher Button (from oldchatbot.vue) -->
    <button @click="chatbotStore.toggleChatbot" class="mikan-launcher-button" aria-label="Toggle Chat">
      <v-icon size="x-large" color="white">{{ chatbotStore.isOpen ? 'mdi-close' : 'mdi-chat-question' }}</v-icon>
    </button>

    <!-- Chat Window (from oldchatbot.vue, bound to Pinia state) -->
    <transition name="chat-fade">
      <div v-if="chatbotStore.isOpen" class="mikan-chat-window">
        
        <header class="mikan-chat-header">
          <div>
            <h1>MIKAN Assistant</h1>
            <div class="subtitle">{{ contextSubtitle }}</div>
          </div>
          <button @click="chatbotStore.toggleChatbot" class="header-close-button" aria-label="Close Chat">
            <v-icon>mdi-window-close</v-icon>
          </button>
        </header>

        <div class="mikan-messages-list" ref="messageList">
          <!-- Message History -->
          <div v-for="(message, index) in chatbotStore.messages" :key="index" :class="['message-row', `message-row-${message.role}`]">
            <div class="avatar" :class="`avatar-${message.role}`">
              <v-icon color="white">{{ message.role === 'user' ? 'mdi-account-tie' : 'mdi-robot-happy-outline' }}</v-icon>
            </div>
            <div class="message-content">
              <div class="message-bubble" :class="`bubble-${message.role}`">
                <!-- Use v-html for potential markdown rendering later, or just <p> for plain text -->
                <p>{{ message.content }}</p>
              </div>
            </div>
          </div>
          
          <!-- Loading Indicator -->
          <div v-if="chatbotStore.isLoading" class="message-row message-row-assistant">
            <div class="avatar avatar-assistant"><v-icon color="white">mdi-robot-happy-outline</v-icon></div>
            <div class="message-content">
              <div class="message-bubble bubble-assistant typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <footer class="mikan-chat-footer">
          <form @submit.prevent="handleSendMessage" class="message-form">
            <input 
              v-model="userMessage" 
              type="text" 
              placeholder="Ask about this page..." 
              :disabled="chatbotStore.isLoading"
              @keydown.enter.prevent="handleSendMessage"
            />
            <button type="submit" :disabled="chatbotStore.isLoading || !userMessage.trim()">
              <v-icon>mdi-send</v-icon>
            </button>
          </form>
        </footer>

      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useChatbotStore } from '@/stores/chatbotStore';

const chatbotStore = useChatbotStore();
const userMessage = ref('');
const messageList = ref(null); // Ref for the message list DOM element

const contextSubtitle = computed(() => {
  return chatbotStore.currentPageContext ? `Context: ${chatbotStore.currentPageContext.name}` : 'No page context';
});

const handleSendMessage = () => {
  if (!userMessage.value.trim()) return;
  chatbotStore.sendMessage(userMessage.value);
  userMessage.value = '';
};

// Function to scroll to the bottom of the chat
const scrollToBottom = () => {
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight;
  }
};

// Watch for new messages and scroll down
watch(() => chatbotStore.messages.length, async () => {
  // Use nextTick to wait for the DOM to update before scrolling
  await nextTick();
  scrollToBottom();
});

// Also watch for loading state changes
watch(() => chatbotStore.isLoading, async (newValue) => {
    if(newValue) {
        await nextTick();
        scrollToBottom();
    }
})

</script>

<style scoped>
/* --- Launcher Button Styling --- */
.mikan-launcher-button {
  background-color: #B71C1C; /* Vuetify red-darken-4 */
  border: none;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  bottom: 25px;
  right: 25px;
  transition: all 0.3s ease;
  z-index: 1001;
}
.mikan-launcher-button:hover {
  transform: scale(1.1);
  background-color: #c62828; /* red-darken-3 */
}

/* --- Chat Window Styling --- */
.mikan-chat-window {
  position: fixed;
  bottom: 100px;
  right: 25px;
  width: 400px;
  height: 600px;
  max-height: calc(100vh - 120px);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

/* --- Vue Transitions --- */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* --- CHAT STYLES --- */
.mikan-chat-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.mikan-chat-header h1 {
  margin: 0;
  font-size: 1.1rem;
  color: #343a40;
  font-weight: 700;
}
.mikan-chat-header .subtitle {
    font-size: 0.75rem;
    color: #6c757d;
}
.header-close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #6c757d;
}
.header-close-button .v-icon {
    font-size: 20px;
}

.mikan-messages-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f1f3f5;
}

.message-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}
.message-row-assistant { justify-content: flex-start; }
.message-row-user { justify-content: flex-end; }
.message-row-user .message-content { align-items: flex-end; }
.message-row-user .avatar { order: 2; }

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #6c757d; /* Default for bot */
}
.avatar-user { background-color: #1976D2; } /* Vuetify primary blue */
.avatar .v-icon {
  font-size: 24px;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 80%;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 18px;
  line-height: 1.5;
  background-color: #e9ecef; /* Default for bot */
  color: #212529;
}
.bubble-assistant { border-bottom-left-radius: 4px; }
.bubble-user {
  background-color: #1976D2; /* Vuetify primary blue */
  color: white;
  border-bottom-right-radius: 4px;
}
.message-bubble p {
    margin: 0;
}

.mikan-chat-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #dee2e6;
  background: #ffffff;
  flex-shrink: 0;
}
.message-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.message-form input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  font-size: 1rem;
  background: #f1f3f5;
}
.message-form input:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}
.message-form button {
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #1976D2;
}
.message-form button .v-icon { font-size: 24px; }
.message-form button:disabled {
  color: #adb5bd;
  cursor: not-allowed;
}

/* Typing Indicator */
.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #6c757d;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}
.typing-indicator span:nth-of-type(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-of-type(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
</style>
