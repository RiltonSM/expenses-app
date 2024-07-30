import { useContext } from "react";
import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expenses-context";

export default function AllExpensesPage() {
    const { expenses } = useContext(ExpensesContext)
    return (
        <ExpensesOutput 
            expensesPeriod="Total" 
            expenses={expenses}
            fallbackText="No registered expenses found!"
        /> 
    )
}