
interface PlayerStatsProps {
    playerData: any
}

type PlayerModel = {
    [playerId: string]: {
        teamId?: string
        matchFormat?: string
        bat?: {
            run?: number[]
            four?: number[]
            six?: number[]
            strikeRate?: number[]
            matchDate?: string[]
            oppCountryId?: string[]
            venueId?: string[]
        },
        bowl?: {
            wicket?: number[]
            maiden?: number[]
            eco?: number[]
            matchDate?: string[]
            oppCountryId?: string[]
            venueId?: string[]
        }
    }
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerData }) => {

    console.log(getPlayerStats(playerData))

    return (
        <div>

        </div>
    )
}

export default PlayerStats


function getPlayerStats(playerData: any): any {
    let player: any = {}

    if (Object.keys(playerData).length > 0) {
        for (const item of playerData.teamBat) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bat Data
            player[item.playerId].bat ??= []

            if (player[item.playerId].bat.length < 5) {
                const playerBat = {
                    run: item.run,
                    four: item.four,
                    six: item.six,
                    strikeRate: item.strikeRate,
                    matchDate: date.toLocaleString('en-IN', options),
                    oppCountryId: item.oppCountryId,
                    venueId: item.venueId
                }
                player[item.playerId].bat.push(playerBat)
            }
        }

        for (const item of playerData.teamBowl) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bowl Data
            player[item.playerId].bowl ??= []

            if (player[item.playerId].bowl.length < 5) {
                const playerBowl = {
                    wicket: item.wicket,
                    maiden: item.maiden,
                    eco: item.eco,
                    matchDate: date.toLocaleString('en-IN', options),
                    oppCountryId: item.oppCountryId,
                    venueId: item.venueId
                }
                player[item.playerId].bowl.push(playerBowl)
            }
        }
    }

    return player
}