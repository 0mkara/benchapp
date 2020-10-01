import React, { FunctionComponent, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ViewStyle,
    TextStyle,
    TextInput
} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './types';
import { PositiveBtn } from './components/positiveBtn';
import { NegativeBtn } from './components/negativeBtn';

interface IQuestion {
    q: string;
    a: string;
}
type QuestionsScreenNavigationProps = StackNavigationProp<StackParamList, 'Questions'>;
interface QuestionsScreenProps {
    navigation: QuestionsScreenNavigationProps;
}
type FormData = {
    question: IQuestion;
};
interface Style {
    inputStyle: TextStyle;
    btnContainer: ViewStyle;
}
const styles = StyleSheet.create<Style>({
    inputStyle: {
        color: 'black',
        padding: 50,
        fontWeight: '500',
        fontSize: 22
    },
    btnContainer: {
        width: Dimensions.get('window').width * 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: 'red', borderWidth: 1,
    }
})


export const QuestionsScreen: FunctionComponent<QuestionsScreenProps> = ({ navigation }) => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [qi, setQi] = useState(0);
    const [positive, setPositive] = useState(false);
    const { control, handleSubmit, setValue, errors } = useForm<FormData>();
    const onYes = () => {
        // Set answer for the question
        const q = questions;
        q[qi].a = "Yes";
        setPositive(true);
        setQuestions([...q]);
        const i = qi + 1;
        if (i < questions.length) {
            setQi(i);
            setValue("question", questions[i]);
        } else if (i == questions.length) {
            navigation.navigate("Result", {
                positive: true
            });
        }
    }
    const onNo = () => {
        // Set answer for the question
        const q = questions;
        q[qi].a = "No";
        setQuestions([...q]);
        const i = qi + 1;
        if (i < questions.length) {
            setQi(i);
            setValue("question", questions[i]);
        } else if (i == questions.length) {
            navigation.navigate("Result", {
                positive
            });
        }
    }
    useEffect(() => {
        const qs = [
            {
                "q": "Have you or anyone in your household had a sore throat, cough, chills, body aches, shortness of breath, loss of smell, loss of taste, fever at or greater than 100° Fahrenheit (38° Celcius) in the last 14 days?",
                "a": "Answer for Q1"
            },
            {
                "q": "Have you or anyone in your household tested positive for COVID-19 in the last 14 days?",
                "a": "Answer for Q2"
            },
            {
                "q": "To the best of your knowledge have you been in close proximity, in the last 14 days, to any individual who tested positive for COVID-19?",
                "a": "Answer for Q3"
            }
        ];
        setQuestions([...qs]);
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                questions.length > 0 &&
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            onBlur={onBlur}
                            editable={false} selectTextOnFocus={false}
                            onChangeText={value => onChange(value)}
                            value={value.q}
                            style={styles.inputStyle}
                            multiline={true}
                        />
                    )}
                    name="question"
                    rules={{ required: true }}
                    defaultValue={questions[qi]}
                />
            }
            {errors.question && <Text>This is required.</Text>}
            <View style={styles.btnContainer}>
                <PositiveBtn onPress={handleSubmit(onYes)} />
                <NegativeBtn onPress={handleSubmit(onNo)} />
            </View>
        </View>
    )
}