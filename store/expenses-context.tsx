import { createContext, ReactNode, useState } from "react";
import { Expense } from "../types/Expense";

interface ExpensesContextProps {
    expenses: Array<Expense>;
    addExpense: (expense: Expense) => void;
    editExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
}

interface ExpensesProviderProps {
    children: ReactNode
}

export const ExpensesContext = createContext<ExpensesContextProps>({
    expenses: [],
    addExpense: () => {},
    editExpense: () => {},
    removeExpense: () => {}
})

const INITIAL_EXPENSES: Array<Expense> = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2024-07-24')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2024-07-23')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2024-07-23')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 14.99,
        date: new Date('2024-07-01')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2024-07-18')
    },
]

export const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
    const [expenses, setExpenses] = useState(INITIAL_EXPENSES)

    const addExpense = (expense: Expense) => {
        setExpenses(oldState => [...oldState, expense])
    }

    const editExpense = (expense: Expense) => {
        setExpenses(oldState => {
            const expenseToEditIndex = oldState.findIndex(expenseItem => expenseItem.id === expense.id)
            const newValue = [...oldState]
            newValue[expenseToEditIndex] = expense
            return newValue
        })
    }

    const removeExpense = (expenseId: string) => {
        setExpenses(oldState => {
            const newValue = oldState.filter(expenseItem => expenseItem.id !== expenseId)
            return newValue
        })
    }

    return (
        <ExpensesContext.Provider value={{
            expenses,
            addExpense,
            editExpense,
            removeExpense
        }}>
            {children}
        </ExpensesContext.Provider>
    )
}