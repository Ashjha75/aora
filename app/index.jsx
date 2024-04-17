import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants"
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
    const { isLoading, isLoaggedIn } = useGlobalContext();
    if (!isLoading && isLoaggedIn) return <Redirect href="/home" />
    return (
        // <View className="flex-1 items-center justify-center bg-[#1f4662]">
        //     <Text className="text-3xl text-yellow-500 font-pblack">Aora!</Text>
        //     <StatusBar style="auto" />
        //     <Link href="/home" style={{ color: 'blue' }}>
        //         <Text>Go To Home</Text>
        //     </Link>

        // </View >

        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain' />
                    <Image source={images.cards} className="w-[380px] h-[308px]" resizeMode='contain' />

                    {/* view for signin */}
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">Discover Endles Possibilities with {' '}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode='contain' />
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
                    <CustomButton title="Continue With Email"
                        handlePress={() => { router.push('/sign-in') }}
                        containerStyle="mt-7 w-full"
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}

