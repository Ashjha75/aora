import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState';
import appWriteFetch from '../../lib/appwriteFetch';
import VideoCard from '../../components/videoCard';
import { useGlobalContext } from '../../context/GlobalProvider'
import { getUserPosts, signOut } from '../../lib/appwrite';
import icons from '../../constants/icons';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
const Profile = () => {
    const { user, setUser, setIsLoaggedIn } = useGlobalContext();
    const { data: posts } = appWriteFetch(() => getUserPosts(user.$id));
    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoaggedIn(false);

        router.replace('/sign-in')

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
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity className="items-end w-full mb-10" onPress={logout}>
                            <Image source={icons.logout} resizeMode='contain' className="w-6 h-6" />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg " resizeMode='cover' />
                        </View>

                        <InfoBox title={user?.username} containerStyles='mt-5' titleStyles="text-lg" />
                        <View className="mt-3 flex-row">
                            <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles='mr-10' titleStyles="text-xl" />
                            <InfoBox title="11.2k" subtitle="Followers" titleStyles="text-xl" />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No Videos found for this search" />)}
            />
        </SafeAreaView>
    )
}

export default Profile
