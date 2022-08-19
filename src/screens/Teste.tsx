import { Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react';

export function Teste() {
    const navigation = useNavigation()

    useEffect(()=>{
        navigation.goBack()
    },[])

    return (
        <VStack>
            <Text>HELLO WORLD</Text>
        </VStack>
    );
}