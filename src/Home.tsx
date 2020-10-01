import React, { FunctionComponent } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    ViewStyle,
    TextStyle
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BaLogo from './components/ba-logo';
import { StackParamList } from './types';

type HomeScreenNavigationProps = StackNavigationProp<StackParamList, 'Home'>;
interface HomeScreenProps {
    navigation: HomeScreenNavigationProps;
}
interface Style {
    balogo: ViewStyle;
    headerContainer: ViewStyle;
    covidHeader: TextStyle;
    secondary: TextStyle;
    btnContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    balogo: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        width: 128, height: 128
    },
    headerContainer: {
        padding: 5,
        width: Dimensions.get('window').width * 0.8,
    },
    covidHeader: {
        color: 'black',
        fontWeight: '700',
        fontSize: 30,
    },
    secondary: {
        fontSize: 18,
        fontWeight: '500'
    },
    btnContainer: {
        // borderColor: 'red', borderWidth: 1,
        width: Dimensions.get('window').width * 0.8,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export const HomeScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.balogo}>
                <BaLogo />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.covidHeader}>Covid 19</Text>
                <Text style={styles.covidHeader}>Health Check</Text>
                <Text style={styles.secondary}>Please answer the following questions related to your health and Covid 19.</Text>
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title="Begin"
                    onPress={() => navigation.navigate('Questions')}
                />
            </View>
        </View>
    )
}