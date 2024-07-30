import { StyleSheet, View } from "react-native"
import { ExpensesList } from "./ExpensesList"
import { ExpensesSummary } from "./ExpensesSummary"
import { Expense } from "../../types/Expense"
import { GlobalStyle } from "../../constants/styles"
import { useContext } from "react"
import { ExpensesContext } from "../../store/expenses-context"

interface ExpensesOutputProps {
    // expenses: Array<Expenses>
    expensesPeriod: string
}

export const ExpensesOutput = ({ expensesPeriod }: ExpensesOutputProps) => {
    const { expenses } = useContext(ExpensesContext)

    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses}/>
            <ExpensesList expenses={expenses}/>
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
    }
})