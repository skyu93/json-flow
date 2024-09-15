import { defineStore } from 'pinia'

interface StoreState {
    isDarkMode: boolean
}

export const useStore = defineStore('JsonFlowStore', {
    state: (): StoreState => ({
        isDarkMode: false
    }),
    actions: {
    }
})
