export const fantasyPointColor = (point: number, matchFormat: string): string => {
    let color = ''
    switch (matchFormat) {
        case 'ODI':
            if (point > 400) {
                color = 'bg-emerald-700 text-white shadow'
            } else if (point > 300) {
                color = 'bg-emerald-600 text-white shadow'
            } else if (point > 150) {
                color = 'bg-emerald-50 text-emerald-700 shadow'
            }
            break;

        case 'T20':
        case 'IPL':
            if (point > 300) {
                color = 'bg-emerald-700 text-white shadow'
            } else if (point > 220) {
                color = 'bg-emerald-600 text-white shadow'
            } else if (point > 180) {
                color = 'bg-emerald-50 text-emerald-700 shadow'
            }
            break;

        default:
            break;
    }

    return color
}

export const capitalizeFullName = (fullName: string) => {
    return fullName.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}