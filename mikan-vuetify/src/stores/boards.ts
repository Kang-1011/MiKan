import { ref } from 'vue';
import axios from 'axios';

export const boards = ref<any[]>([]);

export async function fetchBoards() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/boards');
    boards.value = response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
}

fetchBoards();