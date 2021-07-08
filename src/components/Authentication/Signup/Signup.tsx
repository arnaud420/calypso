import { StackNavigationProp } from '@react-navigation/stack'
import {
  Button, Input, Layout, withStyles,
} from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { autoLogin, register } from '../../../redux/features/authentication/authenticationHelper'
import { RootStackParamList, SCREENS } from '../../../routing/Router'
import ImagePicker from '../../Common/ImagePicker'
import Label from '../Signin/Label'
import styles from './SignupStyles'
import { ButtonLoading } from '../../Common/ButtonLoading';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, SCREENS.SIGNUP_SCREEN>;

type Props = {
  navigation: ProfileScreenNavigationProp,
  eva: any
}

const logo = require('../../../../assets/logo.png')

const Signup = ({ eva, navigation }: Props) => {
  const [profilePicture, setProfilePicture] = useState('')
  const [firstname, setFirstname] = useState('')
  const [firstnameError, setFirstnameError] = useState(false)
  const firstnameRef = useRef(null)
  const [lastname, setLastname] = useState('')
  const [lastnameError, setLastnameError] = useState(false)
  const lastnameRef = useRef(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const emailRef = useRef(null)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const passwordRef = useRef(null)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(false)
  const descriptionRef = useRef(null)
  const [registerError, setRegisterError] = useState<string|boolean>(false)
  const [loading, setLoading] = useState(false)

  const signup = async () => {
    setLoading(true)
    if (
      firstname.length
      && lastname.length
      && description.length
      && email.length
      && password.length
      && profilePicture.length
    ) {
      try {
        const userRegistered = await register({
          profilePicture, email, password, lastname, firstname, description,
        })
        if (userRegistered) {
          autoLogin({ email }).then(() => setLoading(false))
        }
      } catch (e) {
        setRegisterError(e)
        setLoading(false)
      }
    } else {
      setLastnameError(!lastname.length)
      setFirstnameError(!firstname.length)
      setEmailError(!email.length)
      setPasswordError(!password.length)
      setDescriptionError(!description.length)
      setRegisterError('Tous les champs sont requis')
      setLoading(false)
    }
  }

  return (
    <Layout style={eva.style.layout}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[eva.theme['color-warning-600'], eva.theme['color-danger-400']]} style={eva.style.gradientContainer}>
        <ScrollView contentContainerStyle={eva.style.scrollView}>
          <Image source={logo} style={eva.style.logo} />
          <View style={eva.style.inputContainer}>
            <View style={eva.style.profilePicture}>
              <ImagePicker eva={eva} setImage={setProfilePicture} image={profilePicture} isEditable />
            </View>
            <Input
              ref={lastnameRef}
              value={lastname}
              onChangeText={setLastname}
              textContentType="familyName"
              autoCapitalize="words"
              size="medium"
              placeholder="Dupont"
              style={eva.style.input}
              status={lastnameError ? 'success' : 'basic'}
              label={() => <Label text="Nom" />}
            />
            <Input
              ref={firstnameRef}
              value={firstname}
              onChangeText={setFirstname}
              textContentType="name"
              autoCapitalize="words"
              size="medium"
              placeholder="Jean"
              style={eva.style.input}
              status={firstnameError ? 'success' : 'basic'}
              label={() => <Label text="Prénom" />}
            />
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
            <Input
              ref={descriptionRef}
              value={description}
              onChangeText={setDescription}
              autoCapitalize="sentences"
              size="medium"
              placeholder="Parlez-nous de vous..."
              multiline
              numberOfLines={6}
              textStyle={eva.style.textArea}
              style={eva.style.input}
              status={descriptionError ? 'success' : 'basic'}
              label={() => <Label text="Description" />}
            />

            {registerError
              && <Text style={eva.style.errorText} children={(registerError as string)} />}
          </View>

          <View style={eva.style.btnContainer}>
            <Button status="success" onPress={() => navigation.goBack()}>
              {evaProps => <Text {...evaProps} children="Retour" />}
            </Button>

            <ButtonLoading
              label="Valider"
              color="warning"
              action={signup}
              isLoading={loading}
              loadingColor="success"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </Layout>
  )
}

export default withStyles(Signup, styles);
