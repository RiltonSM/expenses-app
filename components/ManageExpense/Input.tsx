import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle } from "react-native"
import { GlobalStyle } from "../../constants/styles"

interface InputProps {
    label: string
    textInputConfig: TextInputProps
    style?: ViewStyle
}

export const Input = ({ label, textInputConfig, style }: InputProps) => {
    const inputStyles: Array<any> = [styles.input];

    if(textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }

    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyle.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyle.colors.primary100,
        color: GlobalStyle.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})