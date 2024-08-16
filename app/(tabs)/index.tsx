import { useContext } from "react";
import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expenses-context";
import { getDateMinusDays } from "../../util/date";
import { LoadingOverlay } from "../../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../../components/UI/ErrorOverlay";

export default function Home() {
    const { expenses, isLoading, error } = useContext(ExpensesContext)

    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })

    if(isLoading){
        return <LoadingOverlay/>
    }

    if(error && !isLoading){
        return <ErrorOverlay/>
    }
    return (
        <ExpensesOutput 
            expensesPeriod="Last 7 Days" 
            expenses={recentExpenses}
            fallbackText="No register for the last 7 days"
        />
    )
}