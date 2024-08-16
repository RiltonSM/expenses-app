import { Pressable, StyleSheet, Text, View } from "react-native"
import { Expense } from "../../types/Expense"
import { GlobalStyle } from "../../constants/styles"
import { getFormattedDate } from "../../util/date"
import { router } from "expo-router"

interface ExpensesItemProps {
    expense: Expense
}

export const ExpensesItem = ({ expense }: ExpensesItemProps) => {
    const expensePressHandler = () => {
        router.navigate(`/manage-expense/${expense.id}`)
    }

    console.log('ExpensesItem', expense);

    return(
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed }>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{expense.description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(expense.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={ styles.amount}>{expense.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyle.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyle.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyle.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyle.colors.primary500,
        fontWeight: 'bold'
    }
})