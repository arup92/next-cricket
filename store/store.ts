import { create } from 'zustand'

interface StoreProps {
    cardDeSelected: any
    currentPage: string
    addCardDeSelected: (object: any) => void
    removeCardDeSelected: (object: any) => void
    emptyCardDeSelected: () => void
    addCurrentPage: (page: string) => void
    emptyCurrentPage: () => void
}

const useZStore = create<StoreProps>((set) => ({
    cardDeSelected: {},
    currentPage: '',
    addCardDeSelected: (cardToSelect) => set((state) => ({
        cardDeSelected: { ...cardToSelect, ...state.cardDeSelected }
    })),
    removeCardDeSelected: (cardToDeSelect) =>
        set((state) => {
            const { [cardToDeSelect.index]: _, ...rest } = state.cardDeSelected;
            return {
                cardDeSelected: { ...rest },
            }
        }),
    emptyCardDeSelected: () => set(() => ({ cardDeSelected: {} })),
    addCurrentPage: (page) => set(() => ({ currentPage: page })),
    emptyCurrentPage: () => set(() => ({ currentPage: '' }))
}))

export default useZStore