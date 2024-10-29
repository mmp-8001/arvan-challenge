import type { PiniaPluginContext } from 'pinia'

export function userPiniaPlugin({ store }: PiniaPluginContext) {
  if (store.$id === 'user') {
    const savedState = localStorage.getItem(store.$id)
    if (savedState) {
      store.$patch(JSON.parse(savedState))
    } else {
      localStorage.setItem(store.$id, JSON.stringify(store.$state))
    }

    store.$subscribe((mutation, state) => {
      localStorage.setItem(store.$id, JSON.stringify(state))
    })
  }
}
