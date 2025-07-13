import { ref } from 'vue';
import axios from 'axios';

export const drafts = ref<any[]>([]);

export async function fetchDrafts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/drafts');
    drafts.value = response.data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
  }
}

declare global {
    interface Window {
      drafts: any;
    }
  }
window.drafts = drafts;
console.log(window.drafts);