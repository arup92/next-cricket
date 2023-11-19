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
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].bat.push(playerBat)
            }
        }

        for (const item of playerData.teamBatVsTeam) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bat Data
            player[item.playerId].batVsTeam ??= []

            if (player[item.playerId].batVsTeam.length < 5) {
                const playerBat = {
                    run: item.run,
                    four: item.four,
                    six: item.six,
                    strikeRate: item.strikeRate,
                    matchDate: date.toLocaleString('en-IN', options),
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].batVsTeam.push(playerBat)
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
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].bowl.push(playerBowl)
            }
        }

        for (const item of playerData.teamBowlVsTeam) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bowl Data
            player[item.playerId].bowlVsTeam ??= []

            if (player[item.playerId].bowlVsTeam.length < 5) {
                const playerBowl = {
                    wicket: item.wicket,
                    maiden: item.maiden,
                    eco: item.eco,
                    matchDate: date.toLocaleString('en-IN', options),
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].bowlVsTeam.push(playerBowl)
            }
        }
    }

    return player
}

export const fantasyPointsCount = (inning: any, type: 'bat' | 'bowl'): number => {
    let totalFantasyPoints: number = 0

    switch (inning.matchFormat) {
        case 'ODI':
            if (type === 'bat') {
                // For every run add 1 point
                totalFantasyPoints += parseInt(inning.run)
                // For every 4 add 1 point
                totalFantasyPoints += parseInt(inning.four)
                // For every 6 add 2 points
                totalFantasyPoints += parseInt(inning.six) * 2
                // For every 50 add 10 points
                totalFantasyPoints += (~~(parseInt(inning.run) / 50) * 10)

                // Strike Rate
                if (inning.run >= 10) {
                    if (inning.strikeRate >= 150) {
                        totalFantasyPoints += 15
                    } else if (inning.strikeRate <= 149.99 && inning.strikeRate >= 125) {
                        totalFantasyPoints += 10
                    } else if (inning.strikeRate <= 124.99 && inning.strikeRate >= 100) {
                        totalFantasyPoints += 5
                    } else if (inning.strikeRate <= 99.99 && inning.strikeRate >= 75) {
                        totalFantasyPoints += 0
                    } else if (inning.strikeRate <= 74.99 && inning.strikeRate >= 50) {
                        totalFantasyPoints += -5
                    } else if (inning.strikeRate <= 49.99 && inning.strikeRate >= 25) {
                        totalFantasyPoints += -10
                    } else if (inning.strikeRate <= 24.99 && inning.strikeRate >= 0) {
                        totalFantasyPoints += -15
                    }
                }
            } else if (type === 'bowl') {
                // For every wicket add 20 points
                totalFantasyPoints += parseInt(inning.wicket) * 20

                //  For every 3 wickets add 10 points
                if (inning.wicket === 10) {
                    totalFantasyPoints += 70
                } else if (inning.wicket === 9) {
                    totalFantasyPoints += 60
                } else if (inning.wicket === 8) {
                    totalFantasyPoints += 50
                } else if (inning.wicket === 7) {
                    totalFantasyPoints += 40
                } else if (inning.wicket === 6) {
                    totalFantasyPoints += 30
                } else if (inning.wicket === 5) {
                    totalFantasyPoints += 20
                } else if (inning.wicket === 4) {
                    totalFantasyPoints += 15
                } else if (inning.wicket === 3) {
                    totalFantasyPoints += 10
                }

                totalFantasyPoints += inning.maiden * 10

                if (inning.eco <= 3) {
                    totalFantasyPoints += 15
                } else if (inning.eco <= 5) {
                    totalFantasyPoints += 10
                } else if (inning.eco <= 7) {
                    totalFantasyPoints += 5
                } else if (inning.eco <= 9) {
                    totalFantasyPoints -= 5
                } else if (inning.eco <= 11) {
                    totalFantasyPoints -= 10
                } else {
                    totalFantasyPoints -= 15
                }
            }
            break;

        default:
            break;
    }
    return totalFantasyPoints
}