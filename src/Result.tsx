import React, { FunctionComponent, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    ViewStyle,
    TextStyle
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './types';
import Tick from './components/tick';
import Cross from './components/cross';

type ResultScreenNavigationProps = StackNavigationProp<StackParamList, 'Result'>;
interface ResultScreenProps {
    navigation: ResultScreenNavigationProps;
}
interface Style {
    container: ViewStyle;
    nameStyle: TextStyle;
    healthCheckStat: TextStyle;
    btnContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        alignItems: 'center', justifyContent: 'center',
        // borderColor: 'red', borderWidth: 1,
        height: Dimensions.get('window').height * 0.3,
    },
    btnContainer: {
        // borderColor: 'red', borderWidth: 1,
        width: Dimensions.get('window').width * 0.8,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    nameStyle: {
        fontWeight: '600',
        fontSize: 34,
        marginBottom: 8
    },
    healthCheckStat: {
        fontWeight: '600',
        fontSize: 24
    }
})

export const ResultScreen: FunctionComponent<ResultScreenProps> = ({ navigation }) => {
    const [today, setToday] = useState(new Date());
    const route = useRoute<RouteProp<StackParamList, 'Result'>>();
    const { positive } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 104, height: 104 }}>
                {
                    !positive &&
                    <Tick />
                }
                {
                    positive &&
                    <Cross />
                }
            </View>
            <View style={styles.container}>
                <Text style={styles.nameStyle}>John Marus</Text>
                {
                    positive &&
                    <Text style={styles.healthCheckStat}>Health Check failed</Text>
                }
                {
                    !positive &&
                    <Text style={styles.healthCheckStat}>Health Check passed</Text>
                }
                <Text style={styles.healthCheckStat}>{today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}</Text>
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title="Done"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </View>
    )
}