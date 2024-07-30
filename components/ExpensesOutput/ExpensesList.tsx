import { FlatList, Text } from "react-native"
import { Expense } from "../../types/Expense"
import { ExpensesItem } from "./ExpenseItem"

interface ExpensesListProps {
    expenses: Array<Expense>
}

export const ExpensesList = ({ expenses }: ExpensesListProps) => {
    return (
        <FlatList 
            data={expenses} 
            renderItem={(itemData) => <ExpensesItem expense={itemData.item}/>}
            keyExtractor={(item) => item.id}
        />
    )
}