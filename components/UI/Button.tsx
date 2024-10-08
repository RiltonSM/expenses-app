import { ReactNode } from "react"
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native"
import { GlobalStyle } from "../../constants/styles";

interface ButtonProps  {
    children: ReactNode;
    onPress: VoidFunction;
    mode?: "flat";
    style?: ViewStyle
}

export const Button = ({ children, onPress, mode, style }: ButtonProps) => {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText ]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyle.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyle.colors.primary200
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyle.colors.primary100,
        borderRadius: 4
    }
})