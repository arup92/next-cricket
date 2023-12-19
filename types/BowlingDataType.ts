export type BowlingDataType = {
    playerId: string
    maiden: number
    wicket: number
    eco: number
    matchFormat?: string
    f11points?: number
    wicketType?: string
}

export const BowlingTypeConst = [
    'Fast',
    'Spin',
    'NA'
] as const
