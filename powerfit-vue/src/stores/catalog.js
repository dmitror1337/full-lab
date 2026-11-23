import { defineStore } from 'pinia'
import { workouts } from '../data/workouts.js'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: workouts,
    favoriteIds: [],
    userItems: []
  }),

  getters: {
    favoriteCount: (state) => state.favoriteIds.length,
    isFavorite: (state) => (id) => state.favoriteIds.includes(id)
  },

  actions: {
    toggleFavorite(id) {
      this.favoriteIds = this.favoriteIds.includes(id)
        ? this.favoriteIds.filter((itemId) => itemId !== id)
        : [...this.favoriteIds, id]
    },
    addUserItem(item) {
      this.userItems = [...this.userItems, item]
    },
    deleteUserItem(id) {
      this.userItems = this.userItems.filter((item) => item.id !== id)
    }
  }
})