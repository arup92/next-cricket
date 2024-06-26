import { BattingDataType } from "@/types/BattingDataType";
import { BowlingDataType } from "@/types/BowlingDataType";
import { Leagues } from "@/types/MatchFormat";
import { MatchFormat } from "@prisma/client";

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
    let rawArray = stringWNwLine.split('\n').map(item => item.replaceAll('*', '').trim())
        .filter(item => (
            item !== ''
            && !item.toLowerCase().startsWith("(")
            && !item.toLowerCase().startsWith("*")
            && !item.toLowerCase().startsWith("impact icon")
        ))
    const finalArray: string[][] = []
    for (let i = 0; i < rawArray.length; i += chunkSize) {
        const chunk: string[] = rawArray.slice(i, i + chunkSize)
        finalArray.push(chunk)
    }

    const result = filterDuplicates(finalArray)

    return result
}

const filterDuplicates = (array: string[][]) => {
    const duplicates: any = {
        'aamir_jamal_i': 'Aamir Jamal',
        'rajvardhan_s_hangargekar': 'Rajvardhan Hangargekar',
        'namboori_thakur_tilak_varma': 'Tilak Varma'
    }

    array.forEach((item: any) => {
        if (duplicates.hasOwnProperty(item[0].toLowerCase().replaceAll(' ', '_').replaceAll('-', '_'))) {
            item[0] = duplicates[item[0].toLowerCase().replaceAll(' ', '_').replaceAll('-', '_')]
        }
    })

    return array
}

export const battingData = (summaryData: string[][], matchFormat?: MatchFormat): BattingDataType[] => {
    let result: BattingDataType[] = []

    for (const [index, summery] of summaryData.entries()) {

        let summeryItem: BattingDataType = {
            playerId: summery[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase(),
            run: parseInt(summery[1]),
            four: parseInt(summery[3]),
            six: parseInt(summery[4]),
            strikeRate: parseFloat(summery[5]),
            battingOrder: index + 1
        }

        if (matchFormat) {
            summeryItem.matchFormat = matchFormat
            summeryItem.f11points = fantasyPointsCount(summeryItem, 'bat')
        }

        result.push(summeryItem)
    }

    return result
}

export const bowlingData = (summaryData: string[][], matchFormat?: MatchFormat): BowlingDataType[] => {
    let result: BowlingDataType[] = []

    for (const [index, summery] of summaryData.entries()) {
        let summeryItem: BowlingDataType = {
            playerId: summery[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase(),
            maiden: parseInt(summery[2]),
            wicket: parseInt(summery[4]),
            eco: parseFloat(summery[5]),
            wicketType: summery[7],
            bowlingOrder: index + 1
        }

        if (matchFormat) {
            summeryItem.matchFormat = matchFormat
            summeryItem.f11points = fantasyPointsCount(summeryItem, 'bowl')
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

    for (const item of playerData.ranks) {
        // Rank Data
        player[item.playerId] ??= {}
        player[item.playerId].ranks ??= []
        player[item.playerId].teamId ??= item.teamId

        if (player[item.playerId].ranks.length < 5) {
            player[item.playerId].ranks.push(item.rank)
        }
    }

    if (Object.keys(playerData).length > 0) {
        for (const item of playerData.teamBat) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].playerType ??= item.Player.playerType
            player[item.playerId].bowlingType ??= item.Player.bowlingType
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bat Data
            player[item.playerId].bat ??= []

            if (player[item.playerId].bat.length < 5) {
                const playerBat = {
                    match: item.Match.id,
                    run: item.run,
                    four: item.four,
                    six: item.six,
                    strikeRate: item.strikeRate,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat,
                    battingOrder: item.battingOrder
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
                    match: item.Match.id,
                    run: item.run,
                    four: item.four,
                    six: item.six,
                    strikeRate: item.strikeRate,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].batVsTeam.push(playerBat)
            }
        }

        for (const item of playerData.teamBatInVenue) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bat Data
            player[item.playerId].batInVenue ??= []

            if (player[item.playerId].batInVenue.length < 5) {
                const playerBat = {
                    match: item.Match.id,
                    run: item.run,
                    four: item.four,
                    six: item.six,
                    strikeRate: item.strikeRate,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].batInVenue.push(playerBat)
            }
        }

        for (const item of playerData.teamBowl) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].playerType ??= item.Player.playerType
            player[item.playerId].bowlingType ??= item.Player.bowlingType
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bowl Data
            player[item.playerId].bowl ??= []

            if (player[item.playerId].bowl.length < 5) {
                const playerBowl = {
                    match: item.Match.id,
                    wicket: item.wicket,
                    maiden: item.maiden,
                    eco: item.eco,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat,
                    bowlingOrder: item.bowlingOrder
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
                    match: item.Match.id,
                    wicket: item.wicket,
                    maiden: item.maiden,
                    eco: item.eco,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].bowlVsTeam.push(playerBowl)
            }
        }

        for (const item of playerData.teamBowlInVenue) {
            const date = new Date(item.matchDate)
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

            player[item.playerId] ??= {}
            player[item.playerId].teamId ??= item.teamId
            player[item.playerId].matchFormat ??= item.matchFormat

            // Bowl Data
            player[item.playerId].bowlInVenue ??= []

            if (player[item.playerId].bowlInVenue.length < 5) {
                const playerBowl = {
                    match: item.Match.id,
                    wicket: item.wicket,
                    maiden: item.maiden,
                    eco: item.eco,
                    matchDate: date.toLocaleString('en-IN', options),
                    f11points: item.f11points,
                    oppCountryId: item.oppCountryId,
                    venueId: item.venue.venueId,
                    venueName: item.venue.venueName,
                    venueCountry: item.venue.venueCountryId,
                    matchFormat: item.matchFormat
                }
                player[item.playerId].bowlInVenue.push(playerBowl)
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
                totalFantasyPoints += (~~(parseInt(inning.run) / 50) * 4)

                // // Strike Rate
                // if (inning.run >= 10) {
                //     if (inning.strikeRate >= 150) {
                //         totalFantasyPoints += 15
                //     } else if (inning.strikeRate <= 149.99 && inning.strikeRate >= 125) {
                //         totalFantasyPoints += 10
                //     } else if (inning.strikeRate <= 124.99 && inning.strikeRate >= 100) {
                //         totalFantasyPoints += 5
                //     } else if (inning.strikeRate <= 99.99 && inning.strikeRate >= 75) {
                //         totalFantasyPoints += 0
                //     } else if (inning.strikeRate <= 74.99 && inning.strikeRate >= 50) {
                //         totalFantasyPoints += -5
                //     } else if (inning.strikeRate <= 49.99 && inning.strikeRate >= 25) {
                //         totalFantasyPoints += -10
                //     } else if (inning.strikeRate <= 24.99 && inning.strikeRate >= 0) {
                //         totalFantasyPoints += -15
                //     }
                // }

                // Strike Rate
                if (inning.strikeRate > 140) {
                    totalFantasyPoints += 6
                } else if (inning.strikeRate > 120 && inning.strikeRate <= 140) {
                    totalFantasyPoints += 4
                } else if (inning.strikeRate >= 100 && inning.strikeRate <= 120) {
                    totalFantasyPoints += 2
                } else if (inning.strikeRate >= 40 && inning.strikeRate <= 50) {
                    totalFantasyPoints -= 2
                } else if (inning.strikeRate >= 30 && inning.strikeRate < 40) {
                    totalFantasyPoints -= 4
                } else if (inning.strikeRate < 30) {
                    totalFantasyPoints -= 6
                }

            } else if (type === 'bowl') {
                // For every wicket add 20 points
                totalFantasyPoints += parseInt(inning.wicket) * 25

                // //  For every 10 wickets add 70 points
                // if (inning.wicket === 10) {
                //     totalFantasyPoints += 70
                // } else if (inning.wicket === 9) {
                //     totalFantasyPoints += 60
                // } else if (inning.wicket === 8) {
                //     totalFantasyPoints += 50
                // } else if (inning.wicket === 7) {
                //     totalFantasyPoints += 40
                // } else if (inning.wicket === 6) {
                //     totalFantasyPoints += 30
                // } else if (inning.wicket === 5) {
                //     totalFantasyPoints += 20
                // } else if (inning.wicket === 4) {
                //     totalFantasyPoints += 15
                // } else if (inning.wicket === 3) {
                //     totalFantasyPoints += 10
                // }

                //  For every 5 wickets add 8 points
                if (inning.wicket >= 5) {
                    totalFantasyPoints += 8
                } else if (inning.wicket === 4) {
                    totalFantasyPoints += 4
                }

                totalFantasyPoints += inning.maiden * 4

                // if (inning.eco <= 3) {
                //     totalFantasyPoints += 15
                // } else if (inning.eco <= 5) {
                //     totalFantasyPoints += 10
                // } else if (inning.eco <= 7) {
                //     totalFantasyPoints += 5
                // } else if (inning.eco <= 9) {
                //     totalFantasyPoints -= 5
                // } else if (inning.eco <= 11) {
                //     totalFantasyPoints -= 10
                // } else {
                //     totalFantasyPoints -= 15
                // }

                if (inning.eco <= 2.5) {
                    totalFantasyPoints += 6
                } else if (inning.eco <= 3.49) {
                    totalFantasyPoints += 4
                } else if (inning.eco <= 4.5) {
                    totalFantasyPoints += 2
                } else if (inning.eco >= 7 && inning.eco <= 8) {
                    totalFantasyPoints -= 2
                } else if (inning.eco < 8 && inning.eco > 9) {
                    totalFantasyPoints -= 4
                } else if (inning.eco > 9) {
                    totalFantasyPoints -= 6
                }

                // Wicket type
                if (!!inning.wicketType && inning.wicketType !== 'na') {
                    inning.wicketType.split(',').forEach((item: string) => {
                        if (item === 'bowled') {
                            totalFantasyPoints += 8
                        } else if (item === 'lbw') {
                            totalFantasyPoints += 8
                        }
                    })
                }
            }
            break;

        default:
            if (type === 'bat') {
                // For every run add 1 point
                totalFantasyPoints += parseInt(inning.run)
                // For every 4 add 1 point
                totalFantasyPoints += parseInt(inning.four)
                // For every 6 add 2 points
                totalFantasyPoints += parseInt(inning.six) * 2

                // // Points for run
                // if (inning.run >= 100) {
                //     totalFantasyPoints += 30
                // } else if (inning.run >= 50) {
                //     totalFantasyPoints += 20
                // } else if (inning.run >= 30) {
                //     totalFantasyPoints += 10
                // }

                // Points for run
                if (inning.run >= 100) {
                    totalFantasyPoints += 16
                } else if (inning.run >= 50) {
                    totalFantasyPoints += 8
                } else if (inning.run >= 30) {
                    totalFantasyPoints += 4
                }

                // // Strike Rate
                // if (inning.run >= 10) {
                //     if (inning.strikeRate >= 200) {
                //         totalFantasyPoints += 15
                //     } else if (inning.strikeRate >= 150) {
                //         totalFantasyPoints += 10
                //     } else if (inning.strikeRate >= 100) {
                //         totalFantasyPoints += 5
                //     } else if (inning.strikeRate >= 75) {
                //         totalFantasyPoints -= 5
                //     } else if (inning.strikeRate >= 50) {
                //         totalFantasyPoints += -10
                //     } else if (inning.strikeRate >= 0) {
                //         totalFantasyPoints += -15
                //     }
                // }

                // Strike Rate
                if (inning.strikeRate > 170) {
                    totalFantasyPoints += 6
                } else if (inning.strikeRate >= 150.01 && inning.strikeRate <= 170) {
                    totalFantasyPoints += 4
                } else if (inning.strikeRate >= 130 && inning.strikeRate <= 150) {
                    totalFantasyPoints += 2
                } else if (inning.strikeRate >= 60 && inning.strikeRate <= 70) {
                    totalFantasyPoints -= 2
                } else if (inning.strikeRate >= 50 && inning.strikeRate < 60) {
                    totalFantasyPoints -= 4
                } else if (inning.strikeRate < 50) {
                    totalFantasyPoints -= 6
                }
            } else if (type === 'bowl') {
                // For every wicket add 25 points
                totalFantasyPoints += parseInt(inning.wicket) * 25

                // //  For every 8 wickets add 80 points
                // if (inning.wicket === 10) {
                //     totalFantasyPoints += 80
                // } else if (inning.wicket === 9) {
                //     totalFantasyPoints += 70
                // } else if (inning.wicket === 8) {
                //     totalFantasyPoints += 60
                // } else if (inning.wicket === 7) {
                //     totalFantasyPoints += 50
                // } else if (inning.wicket === 6) {
                //     totalFantasyPoints += 40
                // } else if (inning.wicket === 5) {
                //     totalFantasyPoints += 30
                // } else if (inning.wicket === 4) {
                //     totalFantasyPoints += 20
                // } else if (inning.wicket === 3) {
                //     totalFantasyPoints += 10
                // }

                //  For every 5 wickets add 16 points
                if (inning.wicket >= 5) {
                    totalFantasyPoints += 16
                } else if (inning.wicket === 4) {
                    totalFantasyPoints += 8
                } else if (inning.wicket === 3) {
                    totalFantasyPoints += 4
                }

                totalFantasyPoints += inning.maiden * 12

                // if (inning.eco <= 5) {
                //     totalFantasyPoints += 15
                // } else if (inning.eco <= 8) {
                //     totalFantasyPoints += 10
                // } else if (inning.eco <= 10) {
                //     totalFantasyPoints += 5
                // } else if (inning.eco <= 12) {
                //     totalFantasyPoints -= 5
                // } else if (inning.eco <= 15) {
                //     totalFantasyPoints -= 10
                // } else {
                //     totalFantasyPoints -= 15
                // }

                if (inning.eco < 5) {
                    totalFantasyPoints += 6
                } else if (inning.eco < 6) {
                    totalFantasyPoints += 4
                } else if (inning.eco >= 6 && inning.eco <= 7) {
                    totalFantasyPoints += 2
                } else if (inning.eco >= 10 && inning.eco <= 11) {
                    totalFantasyPoints -= 2
                } else if (inning.eco > 11 && inning.eco <= 12) {
                    totalFantasyPoints -= 4
                } else if (inning.eco > 12) {
                    totalFantasyPoints -= -6
                }

                // Wicket type
                if (!!inning.wicketType && inning.wicketType !== 'na') {
                    inning.wicketType.split(',').forEach((item: string) => {
                        if (item === 'bowled') {
                            totalFantasyPoints += 8
                        } else if (item === 'lbw') {
                            totalFantasyPoints += 8
                        }
                    })
                }
            }
            break;
    }
    return totalFantasyPoints
}

export const formatDateString = (inputDateString: string): string => {
    const date = new Date(inputDateString);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    }).format(date);

    return formattedDate;
}

export const makeExtra = (sessionBat: string[][], sessionBowl: string[][]) => {
    const playerNames: string[] = []
    const bowlData: string[] = []
    const result: any = {}

    sessionBowl.forEach((item: string[]) => playerNames.push(item[0]))
    sessionBat.forEach((item: string[]) => bowlData.push(item[6]))

    bowlData.forEach((item: string) => {
        if (item.startsWith('b') || item.startsWith('lbw')) {
            if (item.startsWith('b')) {
                if (!!result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string]) {
                    result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string].push('bowled')
                } else {
                    result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string] = ['bowled']
                }
            } else if (item.startsWith('lbw')) {
                if (!!result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string]) {
                    result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string].push('lbw')
                } else {
                    result[getPlayerIdFromInitials(playerNames, item.split('b ')[1]) as string] = ['lbw']
                }
            }
        } else {
            return
        }
    })

    return result
}

const getPlayerIdFromInitials = (playerNames: string[], initial: string) => {
    const initialWords = initial.split(' ')
    const initialFirstWordArray = Array.from(initialWords[0].toLowerCase()) // Convert to lowercase

    for (const name of playerNames) {
        const nameArray = Array.from(name.toLowerCase()) // Convert to lowercase

        if (
            initialFirstWordArray.every(char => nameArray.includes(char))
            && name.split(' ').slice(-1)[0] === initialWords.slice(-1)[0]
        ) {
            return name
        }
    }
}

export const moveToFront = (array: any[], element: any): any[] => {
    if (array.includes(element)) {
        array = array.filter((item: string) => item !== element)
        array = [element, ...array]
    }

    return array
}

export const getLeagueName = (leagueId: string): string => {
    if (Leagues.hasOwnProperty(leagueId)) {
        return Leagues[leagueId]
    }

    return leagueId
}

export const makeRankArrayObject = (rankArray: any[]) => {
    const playerRanks: any = {}

    rankArray.forEach(item => {
        if (!playerRanks[item.playerId]) {
            playerRanks[item.playerId] = []
        }

        if (playerRanks[item.playerId].length < 5) {
            playerRanks[item.playerId].push(item.rank)
        }
    })

    return playerRanks
}