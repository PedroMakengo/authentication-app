import { Stack } from 'expo-router'
import React from 'react-native'
export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#FFF',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="login" options={{ headerTitle: 'Clerk Auth App' }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: 'Create Account' }}
      />
      <Stack.Screen name="reset" options={{ headerTitle: 'Reset Password' }} />
    </Stack>
  )
}
