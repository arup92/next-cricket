import { create } from 'zustand'

type Store = {
    playerIds: any
    add: (playerId: string, teamId: string) => void
    remove: (playerId: string) => void
    clear: () => void
}

const useReviewCardStore = create<Store>()((set) => ({
    playerIds: {},
    add: (playerId: string, teamId: string) => set((state) => ({
        playerIds: { ...state.playerIds, [playerId]: teamId }
    })),
    remove: (playerId: string) => set((state) => {
        const { [playerId]: _, ...rest } = state.playerIds
        return {
            playerIds: rest
        }
    }),
    clear: () => set((state) => {
        return { playerIds: {} }
    }),
}))

export default useReviewCardStore