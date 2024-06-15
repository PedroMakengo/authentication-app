import { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSignUp } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const onSignUpPress = () => {}

  const onPressVerify = () => {}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="exemplo@gmail.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <TextInput
            value={password}
            placeholder="password"
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />

          <Button onPress={onSignUpPress} title="Login" color={'#6c47ff'} />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
              style={styles.inputField}
            />

            <Button
              onPress={onPressVerify}
              title="Verify Email"
              color={'#6c47ff'}
            />
          </View>
        </>
      )}
      <Text>Register</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  inputField: {},
})
