import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, Button } from 'react-native-elements';
import { Linking } from 'react-native';
import Swiper from 'react-native-swiper';

const NewsList: React.FC = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
        try {
            const response = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=fr&apiKey=73779aa87f064c82a07ca3f44f93114f'
            );

            setNews(response.data.articles);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        }

        fetchNews();
    }, []);

    const renderNewsSlides = () => {
        return news.map((item, index) => (
        <View key={index}>
            <Card>
            <Card.Title>{item.title}</Card.Title>
            {/* <Card.Image source={{ uri: item.urlToImage }} /> */}
            <Text>{item.description}</Text>
            <Button
                title="Read more"
                onPress={() => {
                Linking.openURL(item.url).catch((err) =>
                    console.error('Error opening URL:', err)
                );
                }}
            />
            </Card>
        </View>
        ));
    };

    return (
        <View style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
            <Swiper
            showsButtons={false}
            showsPagination={true}
            loop={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            paginationStyle={styles.paginationStyle}
            >
            {renderNewsSlides()}
            </Swiper>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    dotStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDotStyle: {
        backgroundColor: '#007AFF',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 575,
        left: 0,
        right: 0,
    },
});

export default NewsList;
