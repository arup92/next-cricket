export const fantasyPointColor = (point: number): string => {
    let color = ''

    if (point > 400) {
        color = 'bg-emerald-700 text-white shadow'
    } else if (point > 300) {
        color = 'bg-emerald-600 text-white shadow'
    } else if (point > 150) {
        color = 'bg-emerald-50 text-emerald-700 shadow'
    }

    return color
}