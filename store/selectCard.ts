import { create } from 'zustand'

type Store = {
    playerIds: any
    add: (playerId: string) => void
    remove: (playerId: string) => void
}

const useSelectCardStore = create<Store>()((set) => ({
    playerIds: {},
    add: (playerId: string) => set((state) => ({
        playerIds: { ...state.playerIds, [playerId]: 1 }
    })),
    remove: (playerId: string) => set((state) => {
        const { [playerId]: _, ...rest } = state.playerIds
        return {
            playerIds: rest
        }
    }),
}))

export default useSelectCardStore