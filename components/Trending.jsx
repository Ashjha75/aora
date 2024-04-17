import { View, Text, FlatList } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";
const TrendingItem = () => {
    return (
        <Animatable.View animation="fadeInRight" className="bg-white rounded-lg p-4 mr-4">
            <Text className="text-2xl text-black">Trending</Text>
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    return (
        <FlatList data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TrendingItem />)}
            horizontal={true}
        />
    )
}

export default Trending