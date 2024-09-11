import { defineStore } from 'pinia'

interface StoreState {}

export const useStore = defineStore('JsonFlowStore', {
    state: (): StoreState => ({
    }),
    actions: {
    }
})
