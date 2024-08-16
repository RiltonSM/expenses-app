import { StyleSheet, Text, View } from "react-native"
import { GlobalStyle } from "../../constants/styles"
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

export const ErrorOverlay = () => {
    const { error } = useContext(ExpensesContext)
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})