import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { Register } from '../screens/Register'
import  SignUp   from '../screens/SignUp'
import  {Teste}   from '../screens/Teste'

const { Navigator,  Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}} >
            <Screen name="signup" component={ SignUp }/>
            <Screen name="home" component={ Home }/>
            <Screen name="new" component={ Register }/>
            <Screen name="details" component={ Details }/>
            <Screen name="teste" component={ Teste }/>
        </Navigator>
    )
}