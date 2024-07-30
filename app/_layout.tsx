import { Stack } from 'expo-router/stack';
import { GlobalStyle } from '../constants/styles';
import { ExpensesProvider } from '../store/expenses-context';

export default function Layout() {
  return (
    <ExpensesProvider>
      <Stack
        screenOptions={{
          statusBarColor: GlobalStyle.colors.primary500,
          statusBarStyle: 'light',
          headerStyle: {
            backgroundColor: GlobalStyle.colors.primary500
          },
          headerTintColor: 'white'
        }}
      >
          <Stack.Screen 
              name='manage-expense/[id]' 
              options={{ 
                  headerShown: true,
                  presentation: 'modal',
                  animation: 'fade_from_bottom'
              }} 
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpensesProvider>
  );
}
