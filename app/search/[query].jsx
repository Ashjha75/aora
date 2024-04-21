import { FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import appWriteFetch from '../../lib/appwriteFetch';
import VideoCard from '../../components/videoCard';
import { useLocalSearchParams } from 'expo-router';
const Search = () => {
    const { query } = useLocalSearchParams();
    const { data: posts, refetchData } = appWriteFetch(() => searchPosts(query))
    useEffect(() => {
        refetchData()
    }, [query])

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
                    <View className="my-6 px-4 ">
                        <Text className="font-pmedium text-sm text-gray-100">Search Result For</Text>
                        <Text className="text-2xl font-psemibold text-white">{query}</Text>

                        <View className="mt-6 mb-8">
                            <SearchInput initialQuery={query} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No Videos found for this search" />)}
            />
        </SafeAreaView>
    )
}

export default Search
