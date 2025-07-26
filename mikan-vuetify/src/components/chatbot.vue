 
<!-- File: src/components/ContextualChatbot.vue (Styled Version) -->
<template>
  <div>
    <!-- Launcher Button (from oldchatbot.vue) -->
    <button @click="chatbotStore.toggleChatbot" class="mikan-launcher-button" aria-label="Toggle Chat">
      <v-icon size="x-large" color="white">{{ chatbotStore.isOpen ? 'mdi-close' : 'mdi-chat-question' }}</v-icon>
    </button>

    <!-- Chat Window (from oldchatbot.vue, bound to Pinia state) -->
    <transition name="chat-fade">
      <div v-if="chatbotStore.isOpen" class="mikan-chat-window ">
        
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
                  <p v-if="message.content">{{ message.content }}</p>
                  <div v-else-if="message.role === 'assistant'" class="typing-indicator">
                      <span></span><span></span><span></span>
                  </div>
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
            <button type="submit" class="rounded-pill" :disabled="chatbotStore.isLoading || !userMessage.trim()">
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
  // Use a small timeout to ensure the DOM has fully rendered the new height
  setTimeout(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  }, 50);
};

// ✨ NEW: A single deep watcher to handle all scrolling
// This will trigger when a new message is added OR when the content of an existing message changes (i.e., streaming).
watch(
  () => chatbotStore.messages,
  async () => {
    // Wait for the DOM to update with the new content
    await nextTick();
    scrollToBottom();
  },
  { deep: true } // The key to making this work!
);

// Watch for when the chat window is opened to scroll to the bottom
watch(() => chatbotStore.isOpen, async (newValue) => {
    if (newValue) {
      await nextTick();
      scrollToBottom();
    }
});

</script>

<style scoped>
/* --- CHAT STYLES --- */

</style>
