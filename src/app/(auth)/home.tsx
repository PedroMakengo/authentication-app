import { View, Text, StyleSheet } from 'react-native'

import { useUser } from '@clerk/clerk-expo'

export default function Home() {
  const { user } = useUser()
  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
