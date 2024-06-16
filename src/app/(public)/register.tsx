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

  // Registrar um user...
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    setLoading(false)
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      alert(err.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  // Verificar o código digitado...
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }
    setLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: any) {
      alert(err.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="exemplo@gmail.com"
            placeholderTextColor={'#ccc'}
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <TextInput
            value={password}
            placeholder="password"
            placeholderTextColor={'#ccc'}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />

          <Button onPress={onSignUpPress} title="Sign up" color={'#6c47ff'} />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              placeholderTextColor={'#ccc'}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
})
