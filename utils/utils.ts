import { BattingDataType } from "@/types/BattingDataType";
import { BowlingDataType } from "@/types/BowlingDataType";

export const generateRandomHash = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hash += characters.charAt(randomIndex);
    }

    return hash;
}

export const summaryData = (stringWNwLine: string, chunkSize: number): string[][] => {
    let rawArray = stringWNwLine.split('\n').map(item => item.trim()).filter(item => (
        item !== ''
        && !item.toLowerCase().startsWith("c ")
        && !item.toLowerCase().startsWith("b ")
        && !item.toLowerCase().startsWith("run")
        && !item.toLowerCase().startsWith("lbw")
        && !item.toLowerCase().startsWith("not")
        && !item.toLowerCase().startsWith("st ")
        && !item.toLowerCase().startsWith("(")
        && !item.toLowerCase().startsWith("*")
        && !item.toLowerCase().startsWith("timed out")
        && !item.toLowerCase().startsWith("retired")
    ))
    const finalArray: string[][] = []
    for (let i = 0; i < rawArray.length; i += chunkSize) {
        const chunk: string[] = rawArray.slice(i, i + chunkSize)
        finalArray.push(chunk)
    }

    return finalArray
}

export const battingData = (summaryData: string[][]): BattingDataType[] => {
    let result: BattingDataType[] = []

    for (const summery of summaryData) {
        let summeryItem: BattingDataType = {
            playerId: summery[0].replaceAll(' ', '_').toLowerCase(),
            run: parseInt(summery[1]),
            four: parseInt(summery[3]),
            six: parseInt(summery[4]),
            strikeRate: parseFloat(summery[5])
        }

        result.push(summeryItem)
    }

    return result
}

export const bowlingData = (summaryData: string[][]): BowlingDataType[] => {
    let result: BowlingDataType[] = []

    for (const summery of summaryData) {
        let summeryItem: BowlingDataType = {
            playerId: summery[0].replaceAll(' ', '_').toLowerCase(),
            maiden: parseInt(summery[2]),
            wicket: parseInt(summery[4]),
            eco: parseFloat(summery[5])
        }

        result.push(summeryItem)
    }

    return result
}

export const sortStringsAlphabetically = (str1: string, str2: string): string[] => {
    const strings: string[] = [str1, str2]
    strings.sort()

    return strings
}

export const getPlayerStats = (playerData: any): any => {
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