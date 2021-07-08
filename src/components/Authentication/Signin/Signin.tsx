import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import {
  Button, Input, Spinner, withStyles,
} from '@ui-kitten/components'
import { login } from '../../../redux/features/authentication/authenticationHelper'
import Label from './Label'
import styles from './SigninStyles'
import Text from '../../Common/Text'

type Props = {
  eva: any
}

const Signin = ({ eva }: Props) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [loginError, setLoginError] = useState<string | boolean>(false)
  const [loading, setLoading] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const signin = async () => {
    setLoading(true)
    if (email.length && password.length) {
      setEmailError(false)
      setPasswordError(false)
      try {
        await login({ email, password }).then(() => setLoading(false))
      } catch (e) {
        setLoginError(e)
        setEmailError(true)
        setPasswordError(true)
        setLoading(false)
      }
    } else {
      if (!email.length && !password.length) {
        setLoginError('L\'email et le mot de passe sont requis')
        setEmailError(true)
        setPasswordError(true)
      } else if (!email.length) {
        setLoginError('L\'email est requis')
        setEmailError(true)
        setPasswordError(false)
      } else if (!password.length) {
        setLoginError('Le mot de passe est requis')
        setEmailError(false)
        setPasswordError(true)
      } else {
        setEmailError(false)
        setPasswordError(false)
      }
      setLoading(false)
    }
  }

  return (
    <View style={eva.style.container}>
      <Input
        ref={emailRef}
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        size="medium"
        placeholder="jean.dupont@gmail.com"
        style={eva.style.input}
        status={emailError ? 'success' : 'basic'}
        label={() => <Label text="Email" />}
      />
      <Input
        ref={passwordRef}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        keyboardType="visible-password"
        autoCapitalize="none"
        size="medium"
        placeholder="******"
        style={eva.style.input}
        status={passwordError ? 'success' : 'basic'}
        label={() => <Label text="Mot de passe" />}
      />
      {loginError && <Text style={eva.style.errorText} children={(loginError as string)} />}
      <Button
        style={eva.style.btn}
        status="warning"
        onPress={signin}
        accessoryRight={() => (loading ? <Spinner size="small" status="success" /> : <></>)}
      >
        {evaProps => <Text {...evaProps} children="Se connecter" />}
      </Button>
    </View>
  )
}

export default withStyles(Signin, styles)
