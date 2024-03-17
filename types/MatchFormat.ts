export const MatchFormat = [
    'ODI',
    'T20',
    'IPL',
    'SS',
    'BBL',
    'ILT20',
    'SA20',
    'WPL',
    'PSL'
] as const
// Also udpate MatchFormat in prisma

export const MatchType = [
    'MEN',
    'WOMEN',
    'U19'
] as const

export const Leagues: any = {
    'BBL': 'Big Bash League',
    'SS': 'Super Smash',
    'ILT20': 'International League T20',
    'SA20': 'SA20 League',
    'WPL': 'Women\'s Premier League',
    'PSL': 'Pakistan Super League'
}