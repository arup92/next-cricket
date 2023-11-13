interface Matches {
    matchFormat: string
    teamAId: string
    teamBId: string
    result: string
    id: number
    batFirst: string
    matchDate: Date
    venueId: string
    venue: {
        venueName: string
        venueCountryId: string
    }
}