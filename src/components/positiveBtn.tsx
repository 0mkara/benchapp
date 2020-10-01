import React, { FunctionComponent } from 'react';
import {
    View,
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import NoImg from './no';

interface Style {
    imgStyle: ViewStyle;
}
const styles = StyleSheet.create<Style>({
    imgStyle: {
        // borderColor: 'red', borderWidth: 1,
        width: 80,
        height: 80
    }
});
type BtnProps = {
    onPress: (event: GestureResponderEvent) => void;
}

export const PositiveBtn: FunctionComponent<BtnProps> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.imgStyle}>
                <NoImg />
            </View>
        </TouchableOpacity>
    );
}