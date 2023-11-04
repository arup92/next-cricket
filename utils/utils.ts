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
    let rawArray = stringWNwLine.split('\n').filter(item => (
        item !== ''
        && !item.toLowerCase().startsWith("c ")
        && !item.toLowerCase().startsWith("b ")
        && !item.toLowerCase().startsWith("run")
        && !item.toLowerCase().startsWith("lbw")
        && !item.toLowerCase().startsWith("not")
        && !item.toLowerCase().startsWith("st ")
        && !item.toLowerCase().startsWith("(")
    ))
    const finalArray: string[][] = []
    for (let i = 0; i < rawArray.length; i += chunkSize) {
        const chunk: string[] = rawArray.slice(i, i + chunkSize)
        finalArray.push(chunk)
    }

    return finalArray
}

export const sortStringsAlphabetically = (str1: string, str2: string): string[] => {
    const strings: string[] = [str1, str2]
    strings.sort()

    return strings
}