import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
