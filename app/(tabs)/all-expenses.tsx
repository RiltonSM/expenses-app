import { useContext } from "react";
import { ExpensesOutput } from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expenses-context";
import { LoadingOverlay } from "../../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../../components/UI/ErrorOverlay";

export default function AllExpensesPage() {
    const { expenses, isLoading, error } = useContext(ExpensesContext)
    
    if(isLoading){
        return <LoadingOverlay/>
    }

    if(error && !isLoading){
        return <ErrorOverlay />
    }

    return (
        <ExpensesOutput 
            expensesPeriod="Total" 
            expenses={expenses}
            fallbackText="No registered expenses found!"
        /> 
    )
}