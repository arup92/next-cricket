// Make Rank Table data
export const mergeNSortPointsWRank = (array1: any[], array2: any[], matchId: number) => {
    const mergerd: any = {}

    // Construct merged object based on first array
    array1.forEach(item => {
        const { playerId, f11points, teamId } = item

        mergerd[playerId] = {
            playerId,
            f11points,
            teamId
        }
    })

    // Construct & update merged object based on second array
    array2.forEach(item => {
        const { playerId, f11points, teamId } = item

        if (mergerd[playerId]) {
            mergerd[playerId].f11points += item.f11points
        } else {
            mergerd[playerId] = {
                playerId,
                f11points,
                teamId
            }
        }
    })

    // Make the merged array from merged object
    const mergedArray = Object.keys(mergerd).map((playerId: string) => ({
        playerId,
        f11points: mergerd[playerId].f11points,
        teamId: mergerd[playerId].teamId,
    }))

    // Sort and Make Array of Objects for batch Insert with Rank
    const sortedArray = mergedArray.sort((a, b) => b.f11points - a.f11points)
    const result = sortedArray.map((item: any, index: number) => (
        {
            playerId: item.playerId,
            f11points: item.f11points,
            teamId: item.teamId,
            rank: index + 1,
            matchId
        }
    ))

    return result
}