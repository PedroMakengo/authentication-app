import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'

export function LogoutButton() {
  const { signOut } = useAuth()

  const doLogout = () => {
    signOut()

    console.log('Terminado')
  }
  return (
    <Pressable onPress={doLogout}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  )
}

export default function TabsPage() {
  const { isSignedIn } = useAuth()

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  )
}
