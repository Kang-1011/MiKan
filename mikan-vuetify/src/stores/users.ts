import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface UserOption {
  id: number
  name: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<UserOption[]>([])

  async function fetchUsers(): Promise<void> {
    try {
      const response = await axios.get<UserOption[]>('http://127.0.0.1:8000/users')
      users.value = response.data.map(user => ({
        id: user.id,
        name: user.name,
      }))
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return { users, fetchUsers }
})
