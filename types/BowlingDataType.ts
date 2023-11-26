export type BowlingDataType = {
    playerId: string
    maiden: number
    wicket: number
    eco: number
    matchFormat?: string
}

export const BowlingTypeConst = [
    'Fast',
    'Spin',
] as const
