import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps {
    title: string;
    iconName: string;
    onPress: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ title, iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={Styles.buttonContainer}>
            <View style={Styles.iconContainer}>
                <Ionicon name={iconName} size={20} style={Styles.icon} />
            </View>
            <Text style={Styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
        );
    };

const Styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 0,
        margin: 3,
        width: 180,
    },
    iconContainer: {
        borderRadius: 10,
        padding: 10,
        marginRight: 1,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'black',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 100,
        width: 150,
    },
});