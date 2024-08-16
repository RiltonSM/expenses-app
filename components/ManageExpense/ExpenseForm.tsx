import { useContext, useState } from "react"
import { Pressable, StyleSheet, Text, View, Alert } from "react-native"
import { router } from "expo-router";
import RNDatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { Input } from "./Input"
import { Button } from "../UI/Button";
import { ExpensesContext } from "../../store/expenses-context";
import { getFormattedDate } from "../../util/date";

interface ExpenseFormProps {
    isEditing: boolean,
    id: string
}

export const ExpenseForm = ({ isEditing, id }: ExpenseFormProps) => {
    const {expenses, addExpense, editExpense } = useContext(ExpensesContext)
    
    const [inputValues, setInputValues] = useState(() => {
        if(isEditing){
            const expense = expenses.find(expense => expense.id === id)
            if(!expense) {
                return {
                    amount: '',
                    date: '',
                    description: ''
                }
            }
            return {
                amount: expense.amount.toString(),
                date: expense.date.toISOString(),
                description: expense.description
            }
        }
        
        return {
            amount: '',
            date: '',
            description: ''
        }
    });
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    
    const inputChangedHandler = (key: 'amount' | 'date' | 'description', enteredAmount: string) => {
        setInputValues(oldState => {
            return {
                ...oldState,
                [key]: enteredAmount
            }
        })
    }

    const cancelHandler = () => {
        router.back()
    }

    const confirmHandler = () => {
        const expenseData = {
            amount: Number(inputValues.amount),
            date: new Date(inputValues.date),
            description: inputValues.description
        }
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert('Invalid input', 'Please check your input values.')
            return
        }
        
        if(isEditing){
            editExpense({
                id,
                ...expenseData
            })
        } else {
            addExpense(expenseData)
        }
        router.back()
    }

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setIsDatePickerVisible(false)
        if(event.type === 'set'){
            setInputValues(oldState => {
                return {
                    ...oldState,
                    date: selectedDate ? selectedDate.toISOString() : '' 
                }
            })
        }
    }

    const onToogleDatePickerVisibility = () => {
        setIsDatePickerVisible(oldState => !oldState)
    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount" 
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (text) => inputChangedHandler('amount', text),
                        value: inputValues.amount
                    }}
                    style={styles.rowInput}
                />
                <Pressable onPress={onToogleDatePickerVisibility} style={styles.rowInput}>
                    <Input 
                        label="Date" 
                        textInputConfig={{
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: (text) => inputChangedHandler('date', text),
                            value:inputValues.date !== '' ? getFormattedDate(new Date(inputValues.date)) : inputValues.date,
                            onPress: () => {},
                            editable: false
                        }}
                    />
                </Pressable>
               {isDatePickerVisible && (
                    <RNDatePicker 
                        mode="date" 
                        display="spinner" 
                        onChange={onChangeDate} 
                        value={inputValues.date !== '' ? new Date(inputValues.date) : new Date()}
                    />
               )}
            </View>
            <Input 
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: (text) => inputChangedHandler('description', text),
                    value: inputValues.description
                }}
            />

            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})