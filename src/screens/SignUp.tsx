import { useState } from 'react'
import {Alert} from 'react-native'
import auth from  '@react-native-firebase/auth'
import { VStack, Heading, Icon, useTheme, Text } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import Logo from '../assets/logo_primary.svg'

import { Input } from "../components/Input"
import { Button } from '../components/Button'


function SignUp(){
    const [isLoading, setIsLoading] = useState(false)
    const { colors } = useTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)

    function handleSignUp(){
        if (!email || !password || !rePassword){
            return Alert.alert('Cadastrar', 'Preencha todos os campos.');
        }

        setIsLoading(true) 

        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            Alert.alert('Cadastro', 'Usuário cadastrado com sucesso.');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Cadastro', 'O email já está em uso.');
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('Cadastro', 'O endereço de email é inválido.');
            }

            if (error.code === 'auth/weak-password') {
                Alert.alert('Cadastro', 'A senha é muito fraca. Tente outra.');
            }

            console.error(error);
        });

        setIsLoading(false) 
    }

    function checkPassword(text){
        if(!password || !rePassword){
            setIncorrect(false)
            return
        }

        if (rePassword != text){
            setIncorrect(true)
        } else {
            setIncorrect(false)
        }
    }

    function checkRePassword(text){
        if(!password || !rePassword){
            setIncorrect(false)
            return
        }

        if (password != text){
            setIncorrect(true)
        } else {
            setIncorrect(false)
        }
    } 
    
    return (
        
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Crie sua conta
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
                onChangeText={
                    (text) => {
                        setPassword(text)
                        checkPassword(text)
                    }
                }
            /> 

            <Input
                mb={6}
                placeholder="Repetir senha" 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={
                    (text) => {
                        setRePassword(text)
                        checkRePassword(text)
                    }
                }
            />

            <Button 
                title="Cadastrar" 
                w="full" 
                onPress={handleSignUp}
                isLoading={isLoading}
                disabled={incorrect ? true : false}
            />

            {incorrect ? <Text color='#ff0000' fontSize={18}>Senhas não conferem</Text> : null}

        </VStack>
    )
}

export default SignUp