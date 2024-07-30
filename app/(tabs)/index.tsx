import { useContext } from "react";
import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expenses-context";
import { getDateMinusDays } from "../../util/date";

export default function Home() {
    const { expenses } = useContext(ExpensesContext)

    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })
    return (
        <ExpensesOutput 
            expensesPeriod="Last 7 Days" 
            expenses={recentExpenses}
            fallbackText="No register for the last 7 days"
        />
    )
}