import { StyleSheet, Text, View } from "react-native"
import { ExpensesList } from "./ExpensesList"
import { ExpensesSummary } from "./ExpensesSummary"
import { Expense } from "../../types/Expense"
import { GlobalStyle } from "../../constants/styles"

interface ExpensesOutputProps {
    expenses: Array<Expense>;
    expensesPeriod: string;
    fallbackText: string;
}

export const ExpensesOutput = ({ expensesPeriod, expenses, fallbackText }: ExpensesOutputProps) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyle.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})