enum PlayerType {
    Batsman,
    Bowler,
    AllRounder
}

export const PlayerTypeConst = [
    'Batsman',
    'Bowler',
    'AllRounder',
    'NA'
] as const

interface Player {
    playerId: string
    playerName: string
    playerCountryId: string
    playerType?: PlayerType
    weakness?: String
}