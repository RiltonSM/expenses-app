import { StyleSheet, Text, View } from "react-native"
import { Expense } from "../../types/Expense";
import { GlobalStyle } from "../../constants/styles";

interface ExpensesSummaryProps {
    periodName: string;
    expenses: Array<Expense>
}

export const ExpensesSummary = ({ periodName, expenses }: ExpensesSummaryProps) => {
    const expensesSum = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyle.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyle.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary500
    }
})