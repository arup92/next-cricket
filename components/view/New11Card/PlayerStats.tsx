
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
            player[item.playerId].bat ??= {}
            player[item.playerId].bat.run ??= []
            player[item.playerId].bat.four ??= []
            player[item.playerId].bat.six ??= []
            player[item.playerId].bat.strikeRate ??= []
            player[item.playerId].bat.matchDate ??= []
            player[item.playerId].bat.oppCountryId ??= []
            player[item.playerId].bat.venueId ??= []

            if (player[item.playerId].bat.run.length < 5) {
                player[item.playerId].bat.run.push(item.run)
                player[item.playerId].bat.four.push(item.four)
                player[item.playerId].bat.six.push(item.six)
                player[item.playerId].bat.strikeRate.push(item.strikeRate)
                player[item.playerId].bat.matchDate.push(date.toLocaleString('en-IN', options))
                player[item.playerId].bat.oppCountryId.push(item.oppCountryId)
                player[item.playerId].bat.venueId.push(item.venueId)
            }
        }

        for (const item of playerData.teamBowl) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bowl Data
            player[item.playerId].bowl ??= {};
            player[item.playerId].bowl.wicket ??= [];
            player[item.playerId].bowl.maiden ??= [];
            player[item.playerId].bowl.eco ??= [];
            player[item.playerId].bowl.matchDate ??= [];
            player[item.playerId].bowl.oppCountryId ??= [];
            player[item.playerId].bowl.venueId ??= [];

            if (player[item.playerId].bowl.wicket.length < 5) {
                player[item.playerId].bowl.wicket.push(item.wicket);
                player[item.playerId].bowl.maiden.push(item.maiden);
                player[item.playerId].bowl.eco.push(item.eco);
                player[item.playerId].bowl.matchDate.push(date.toLocaleString('en-IN', options));
                player[item.playerId].bowl.oppCountryId.push(item.oppCountryId);
                player[item.playerId].bowl.venueId.push(item.venueId);
            }
        }
    }

    return player
}