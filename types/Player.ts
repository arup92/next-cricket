enum PlayerType {
    Batsman,
    Bowler,
    AllRounder
}

interface Player {
    playerId: string
    playerName: string
    playerCountryId: string
    playerType?: PlayerType
    weakness?: String
}