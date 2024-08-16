import { createContext, ReactNode, useEffect, useState } from "react";
import { Expense } from "../types/Expense";
import { api } from "../services/api";

interface ExpensesContextProps {
    expenses: Array<Expense>;
    isLoading: boolean;
    error: string | null;
    addExpense: (expense: Omit<Expense, "id">) => void;
    editExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
}

interface ExpensesProviderProps {
    children: ReactNode
}

export const ExpensesContext = createContext<ExpensesContextProps>({
    expenses: [],
    isLoading: true,
    error: null,
    addExpense: () => {},
    editExpense: () => {},
    removeExpense: () => {}
})

export const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
    const [expenses, setExpenses] = useState<Array<Expense>>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getExpensesFromAPI = async () => {
            try{
                setIsLoading(true)
                const expensesFromAPI = await api.get('/expenses.json')
    
                const expensesWithConvertedId: Array<Expense> = Object.keys(expensesFromAPI.data).map(key => {
                    return {
                        ...expensesFromAPI.data[key],
                        date: new Date(expensesFromAPI.data[key].date),
                        id: key,
                    }
                })
    
                setExpenses(expensesWithConvertedId)
            } catch(error) {
                setError('Something went wrong with expenses fetching')
            }
            setIsLoading(false)
        }

        getExpensesFromAPI()
    }, [])

    const addExpense = async (expense: Omit<Expense, "id">) => {
        try {
            setIsLoading(true)
            const response = await api.post('/expenses.json', expense)
            const newExpense = {
                id: response.data.name,
                ...expense
            }
    
            const newExpensesList = [
                ...expenses,
                newExpense
            ]
            setExpenses(newExpensesList)
            
        } catch (error) {
            setError('Something went wrong with expenses adding')
        }
        setIsLoading(false)
    }

    const editExpense = async (expense: Expense) => {
        try {
            setIsLoading(true)
            const newExpensesList = [...expenses]
            const expenseToEdit = newExpensesList.findIndex(expenseItem => expenseItem.id === expense.id)
            newExpensesList[expenseToEdit] = expense
            setExpenses(newExpensesList)
            await api.put(`/expenses/${expense.id}.json`, expense)
        } catch (error) {
            setError('Something went wrong with expenses editing')
        }
        setIsLoading(false)
    }

    const removeExpense = async (expenseId: string) => {
        try {
            setIsLoading(true)
            setExpenses(oldState => {
                const newValue = oldState.filter(expenseItem => expenseItem.id !== expenseId)
                return newValue
            })
            await api.delete(`/expenses/${expenseId}.json`)
            setIsLoading(false)
        } catch (error) {
            setError('Something went wrong with expenses removing')
        }
        setIsLoading(false)
    }

    return (
        <ExpensesContext.Provider value={{
            expenses,
            isLoading,
            error,
            addExpense,
            editExpense,
            removeExpense
        }}>
            {children}
        </ExpensesContext.Provider>
    )
}