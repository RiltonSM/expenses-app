export const getFormattedDate = (date: Date) => {
    return `${date.getDate()}/${(date.getMonth() + 1).toLocaleString('pt-br', { minimumIntegerDigits: 2})}/${date.getFullYear()}`
}

export const getDateMinusDays = (date: Date, numberOfDays: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - numberOfDays);
}