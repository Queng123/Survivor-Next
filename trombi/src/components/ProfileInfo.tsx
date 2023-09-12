import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

interface ProfileInfoProps {
    name: string;
    post: string;
    email: string;
    birthday: string;
    gender: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    name,
    post,
    email,
    birthday,
    gender,
}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image}></Image>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.line}></View>
            <Text style={styles.infoLabel}>Poste</Text>
            <Text style={styles.info}>{post}</Text>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.info}>{email}</Text>
            <Text style={styles.infoLabel}>Anniversaire</Text>
            <Text style={styles.info}>{birthday}</Text>
            <Text style={styles.infoLabel}>Genre</Text>
            <Text style={styles.info}>{gender}</Text>
            <View style={styles.buttonsContainer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 30,
    },
    name: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 30,
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        width: '75%',
        marginBottom: 30,
    },
    infoLabel: {
        color: 'black',
        fontSize: 25,
    },
    info: {
        color: 'black',
        fontSize: 20,
        paddingBottom: 15,
    },
});

export default ProfileInfo;
