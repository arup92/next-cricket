export type BowlingDataType = {
    playerId: string
    maiden: number
    wicket: number
    eco: number
    matchFormat?: string
    f11points?: number
}

export const BowlingTypeConst = [
    'Fast',
    'Spin',
    'NA'
] as const
