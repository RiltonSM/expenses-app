import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/UI/IconButton";
import { GlobalStyle } from "../../constants/styles";
import { Button } from "../../components/UI/Button";
import { ExpensesContext } from "../../store/expenses-context";

export default function ManageExpensesPage() {
    const { id } = useLocalSearchParams();
    const isEditing = id !== 'null';
    const { setOptions } = useNavigation()
    const { removeExpense } = useContext(ExpensesContext)

    useLayoutEffect(() => {
        setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [isEditing])

    const deleteExpenseHandler = () => {
        removeExpense(id as string)
        router.back()
    }

    const cancelHandler = () => {
        router.back()
    }

    const confirmHandler = () => {
        router.back()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: 'center'
    }
})