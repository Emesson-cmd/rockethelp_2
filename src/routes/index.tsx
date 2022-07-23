import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Loading } from "../components/loading"
import  SignIn from '../screens/SignIn'

import { AppRoutes } from './app.routes'

export function Routes(){
    const [loading, setIsLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        console.log("Iniciou o index")
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
            console.log("Usuário Logou!")
        })

        return subscriber
    }, [])

    if(loading) {
        return <Loading />
    }
    
    return(
        <NavigationContainer>
            {user ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
    )
}