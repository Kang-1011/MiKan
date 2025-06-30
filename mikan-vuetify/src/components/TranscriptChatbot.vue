<script setup>
import { ref, nextTick } from 'vue';

// --- STATE & LOGIC FROM lightbulb.vue ---
// This ref now controls the visibility of the entire chat window
const isPopupVisible = ref(false);

// This function will now open the chat window
const toggleChat = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

// This function will close the chat window from the inside
const closeChat = () => {
  isPopupVisible.value = false;
};


// --- STATE & LOGIC FROM chat.vue ---
const messages = ref([]);
const query = ref('');
const isLoading = ref(false);
const error = ref(null);

async function handleQuery() {
  const userQuery = query.value.trim();
  if (!userQuery) return;

  messages.value.push({
    id: Date.now(),
    text: userQuery,
    sender: 'user',
  });

  const currentQuery = query.value;
  query.value = '';
  isLoading.value = true;
  error.value = null;

  await nextTick();
  scrollToBottom();

  try {
    const response = await fetch('http://127.0.0.1:8000/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: currentQuery, top_k: 3 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const apiResponse = await response.json();

    messages.value.push({
      id: Date.now() + 1,
      text: apiResponse.answer,
      sender: 'bot',
      sources: apiResponse.retrieved_documents,
    });
  } catch (e) {
    console.error(e);
    messages.value.push({
      id: Date.now() + 1,
      text: 'Sorry, I was unable to get a response. Please try again.',
      sender: 'bot',
      isError: true,
    });
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
}

function scrollToBottom() {
  // Use a unique ref for the message list to avoid conflicts
  const messageList = document.querySelector('.mikan-messages-list');
  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight;
  }
}
</script>

<template>
  <div>
    <button @click="toggleChat" class="bulb-button" aria-label="Toggle Chat">
      <i class="mdi" :class="isPopupVisible ? 'mdi-close' : 'mdi-chat-processing-outline'"></i>
    </button>

    <transition name="chat-fade">
      <div v-if="isPopupVisible" class="chat-window">
        <header class="chat-header">
          <h1>MIKAN Assistant</h1>
          <button @click="closeChat" class="header-close-button" aria-label="Close Chat">
            <i class="mdi mdi-window-close"></i>
          </button>
        </header>

        <div class="mikan-messages-list">
          <div v-if="messages.length === 0" class="welcome-message">
            <p>Welcome! Ask me anything about the meeting.</p>
          </div>
          <div v-for="message in messages" :key="message.id" :class="['message-row', `message-row-${message.sender}`]">
            <div class="avatar" :class="`avatar-${message.sender}`">
              <i class="mdi" :class="message.sender === 'user' ? 'mdi-account-tie' : 'mdi-robot-happy'"></i>
            </div>
            <div class="message-content">
              <div class="message-bubble" :class="`bubble-${message.sender}`">
                <p>{{ message.text }}</p>
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="message-row message-row-bot">
            <div class="avatar avatar-bot"><i class="mdi mdi-robot-happy"></i></div>
            <div class="message-content">
              <div class="message-bubble bubble-bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <footer class="chat-footer">
          <form @submit.prevent="handleQuery" class="message-form">
            <input v-model="query" type="text" placeholder="Ask a question..." :disabled="isLoading" />
            <button type="submit" :disabled="isLoading || !query.trim()">
              <i class="mdi mdi-send"></i>
            </button>
          </form>
        </footer>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* --- Launcher Button Styling --- */
.bulb-button {
  background-color: lightgrey;
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
  z-index: 1001; /* Must be higher than the chat window */
}
.bulb-button:hover {
  transform: scale(1.1);
}
.bulb-button .mdi {
  font-size: 32px;
  color: white;
}

/* --- Chat Window Styling (as a Pop-up) --- */
.chat-window {
  position: fixed;
  bottom: 100px; /* Position above the launcher button */
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


/* --- CHAT STYLES (Merged and adapted from chat.vue) --- */
.chat-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.chat-header h1 {
  margin: 0;
  font-size: 1.1rem;
  color: #343a40;
}
.header-close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #6c757d;
}
.header-close-button .mdi {
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

.welcome-message {
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
  padding: 2rem 0;
}

.message-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}
.message-row-bot { justify-content: flex-start; }
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
.avatar-user { background-color: #007bff; }
.avatar .mdi {
  font-size: 24px;
  color: white;
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
.bubble-bot { border-bottom-left-radius: 4px; }
.bubble-user {
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-footer {
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
.message-form button {
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #007bff;
}
.message-form button .mdi { font-size: 24px; }
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