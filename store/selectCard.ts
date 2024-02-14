import { create } from 'zustand'

type Store = {
    teams: string[]
    playerIds: any
    setTeam: (teams: string[]) => void
    add: (playerId: string, teamId: string) => void
    remove: (playerId: string) => void
    clear: () => void
}

const useSelectCardStore = create<Store>()((set) => ({
    playerIds: {},
    teams: [],
    setTeam: (teams: string[]) => set((state) => {
        teams.forEach(team => {
            if (!state.teams.includes(team)) {
                state.clear()
                return
            }
        })

        return {
            teams
        }
    }),
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
        return {
            playerIds: {},
            teams: []
        }
    }),
}))

export default useSelectCardStore