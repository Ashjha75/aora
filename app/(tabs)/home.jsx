import { FlatList, StyleSheet, Text, View, Image, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getLatestPosts, getNewPosts } from '../../lib/appwrite';
import appWriteFetch from '../../lib/appwriteFetch';
import VideoCard from '../../components/videoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
const Home = () => {
    const { data: posts, refetchData } = appWriteFetch(getNewPosts)
    const { user } = useGlobalContext();
    const { data: latestPosts } = appWriteFetch(getLatestPosts)

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true)
        // re call videros-> if any new videos appeared
        refetchData()
        setRefreshing(false)
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View>
                        <VideoCard video={item} />
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome Back </Text>
                                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain' />
                            </View>
                        </View>
                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">Trending Videos</Text>
                            <Trending posts={latestPosts} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="Be the First one to upload a video" />)}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})