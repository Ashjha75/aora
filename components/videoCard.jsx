import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { ResizeMode, Video } from 'expo-av';
const VideoCard = ({ video: { title, thumbnail, video, users: { username, avatar } } }) => {
    const [play, setPlay] = useState(false);
    return (
        <View className="flex-col items-center  px-4 mb-14">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5 ">
                    <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='contain' />
                </View>
                <View className="justify-center  ml-3 flex-1 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                    <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>{username}</Text>
                </View>
                <View className="" pt-2>
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
                </View></View>

            {play ? (
                // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                <Video
                    // source={{ uri: video }}
                    source={{
                        uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    }}
                    className="w-full h-60 rounded-xl mt-3 "
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false)
                        }
                    }}
                    onError={(e) => {
                        console.log('Error loading video', e);
                        Alert.alert('Error loading video', e);
                    }}
                />) : (
                <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <Image source={{ uri: thumbnail }} className="w-full h-60 mt-3 rounded-xl" resizeMode='cover' />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>
            )}

        </View>
    )
}

export default VideoCard