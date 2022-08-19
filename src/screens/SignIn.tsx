import { useEffect, useState } from 'react'
import {Alert} from 'react-native'
import auth from  '@react-native-firebase/auth'
import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import Logo from '../assets/logo_primary.svg'

import { Input } from "../components/Input"
import { Button } from '../components/Button'

import SignUp from './SignUp'


function SignIn(){
    const [isLoading, setIsLoading] = useState(false)
    const { colors } = useTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    function handleSignIn(){
        if (!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }

        setIsLoading(true) 

        auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => { 
            console.log(error)
            setIsLoading(false)

            if(error.code === 'auth/invalid-email'){
                return Alert.alert("Entrar", "E-mail ou senha inválido.")
            }
            
            if(error.code === 'auth/wrong-password'){
                return Alert.alert("Entrar", "E-mail ou senha inválido.")
            }

            if(error.code === 'auth/user-not-found'){
                return Alert.alert("Entrar", "Usuário não cadastrado.")
            }

            return Alert.alert("Entrar", "Não foi possível entrar.")

        })
    }

    function handleSignUp(){
        //navigation.navigate('signup')
        navigation.navigate('teste')
    }  
    
    useEffect(() => {

    }, [])
    
    return (
        
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading> 

            <Input 
                mb={4}
                placeholder='E-mail'
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />

            <Input 
                mb={6}
                placeholder="Senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            /> 

            <Button 
                title="Entrar" 
                mb={6}
                w="full" 
                onPress={handleSignIn}
                isLoading={isLoading}
            />

            <Button 
                title="Cadastre-se" 
                w="full" 
                bg='black'
                borderColor={'green.700'}
                borderWidth={2}
                onPress={handleSignUp}
                isLoading={isLoading}
            />

        </VStack>
    )
}

export default SignIn