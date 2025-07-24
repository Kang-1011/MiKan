import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface ProjectOption {
  id: number
  title: string
}

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as ProjectOption[],
  }),

  getters: {},

  actions: {
    async fetchProjects() {
      try {
        const response = await axios.get<ProjectOption[]>('http://127.0.0.1:8000/projects')
        this.projects = response.data.map(project => ({
          id: project.id,
          title: project.title,
        }))
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    },
    async fetchProjectByID(projectId: number) {
      try {
        const response = await axios.get<ProjectOption[]>(`http://127.0.0.1:8000/projects/?projectId=${projectId}`)
        const project = response.data[0]
        return project ? {id: project.id, title: project.title} : null
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    },
  }
})

// export const useProjectStore = defineStore('project', () => {
//   const projects = ref<ProjectOption[]>([])

//   async function fetchProjects(){
//     try {
//       const response = await axios.get<ProjectOption[]>('http://127.0.0.1:8000/projects')
//       projects.value = response.data.map(project => ({
//         id: project.id,
//         title: project.title,
//       }))
//     } catch (error) {
//       console.error('Error fetching projects:', error)
//     }
//   }

//   async function fetchProjectByID(projectId: number) {
//     try {
//       const response = await axios.get<ProjectOption[]>(`http://127.0.0.1:8000/projects/?projectId=${projectId}`)
//       const project = response.data[0]
//       return project.title
//     } catch (error) {
//       console.error('Error fetching projects:', error)
//     }
//   }

//   return { projects, fetchProjects, fetchProjectByID }
// })