import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface ProjectOption {
  id: number
  title: string
}

export const useProjectStore = defineStore('project', () => {
  const projects = ref<ProjectOption[]>([])

  async function fetchProjects(): Promise<void> {
    try {
      const response = await axios.get<ProjectOption[]>('http://127.0.0.1:8000/projects')
      projects.value = response.data.map(project => ({
        id: project.id,
        title: project.title,
      }))
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  return { projects, fetchProjects }
})