import axios from 'axios'
import { defineStore } from 'pinia'

// export const useMeetingsStore = defineStore('meetings', {
//     state: () => ({
//         meetings: [],
//         loading: false,
//         error: '',
//     }),

//     getters: {
//         meetingsCount: (state): number => state.meetings.length,
//     },

//     actions: {
//         async fetchMeetings() {
//             this.loading = true
//             this.error = ''

//             try {
//                 const response = await axios.get("http://localhost:8000/get-meetings")
//                 this.meetings = response.data.meetings
//                 console.log(response.data)
//             } catch (error: any) {
//                 this.error = 'Failed to fetch meetings'
//                 console.error('Error fetching meetings:', error)
//             } finally {
//                 this.loading = false
//             }
//         },
//     }
// })
export const useMeetingsStore = defineStore('meetings', {
    state: () => ({
        meetings: [],
        totalMeetings: 0, // Add total count
        loading: false,
        error: '',
    }),

    getters: {
        meetingsCount: (state): number => state.totalMeetings, // Use total count
    },

    actions: {
        async fetchMeetings(options = {}) {
            this.loading = true
            this.error = ''

            try {
                // Extract pagination parameters
                const { page = 1, itemsPerPage = 10, sortBy = [] } = options
                
                const response = await axios.get("http://localhost:8000/get-meetings", {
                    params: {
                        page,
                        limit: itemsPerPage,
                        sortBy: sortBy.length > 0 ? sortBy[0].key : '',
                        sortOrder: sortBy.length > 0 ? (sortBy[0].order || 'asc') : 'asc'
                    }
                })
                
                this.meetings = response.data.meetings // Only current page items
                this.totalMeetings = response.data.total // Total count from server
                console.log(response.data)
            } catch (error: any) {
                this.error = 'Failed to fetch meetings'
                console.error('Error fetching meetings:', error)
            } finally {
                this.loading = false
            }
        },
        async downloadTranscript(meeting_id: number) {
            try {
                const response = await axios.get(`http://localhost:8000/meeting_transcript/download_file/${meeting_id}`, { responseType: 'blob' });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'transcript.pdf';
                link.click();
                URL.revokeObjectURL(url);
            } catch (error: any) {
                console.error('Error downloading transcript:', error);
            }
        }
    }
})