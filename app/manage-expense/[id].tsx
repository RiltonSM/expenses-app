import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/UI/IconButton";
import { GlobalStyle } from "../../constants/styles";
import { ExpensesContext } from "../../store/expenses-context";
import { ExpenseForm } from "../../components/ManageExpense/ExpenseForm";
import { LoadingOverlay } from "../../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../../components/UI/ErrorOverlay";

export default function ManageExpensesPage() {
    const { id } = useLocalSearchParams();
    const isEditing = id !== 'null';
    const { setOptions } = useNavigation()
    const { removeExpense, isLoading, error } = useContext(ExpensesContext)

    useLayoutEffect(() => {
        setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [isEditing])

    const deleteExpenseHandler = () => {
        removeExpense(id as string)
        router.back()
    }

    if(isLoading){
        return <LoadingOverlay/>
    }

    if(error && !isLoading){
        return <ErrorOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm id={id as string} isEditing={isEditing}/>
            
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyle.colors.error500} 
                        size={36} 
                        onPress={deleteExpenseHandler}
                    />
                </View>

            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: 'center'
    }
})