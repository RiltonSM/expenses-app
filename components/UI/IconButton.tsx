import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"

interface IconButtonProps {
    icon: any;
    size: number;
    color: string;
    onPress: () => void;
}

export const IconButton = ({ color, icon, size, onPress }: IconButtonProps) => {
    return(
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} color={color} size={size}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})