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
            eco: parseInt(summery[5])
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