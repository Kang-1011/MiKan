import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
  },
})
