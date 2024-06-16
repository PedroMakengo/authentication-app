import { useSignIn } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [loading, setLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const onSignInPres = async () => {
    if (!isLoaded) {
      return
    }

    setLoading(true)
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })

      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      alert(err.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
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

      <Button onPress={onSignInPres} title="Login" color={'#6c47ff'} />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
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
