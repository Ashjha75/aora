import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from "../../components/FormField"
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Create = () => {
    const { user } = useGlobalContext();
    const [Uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    });
    const openPicker = async (selectType) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: selectType === 'Image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                if (selectType === "Video") {
                    setForm({ ...form, video: result.assets[0] })
                }
                else if (selectType === "Image") {
                    setForm({ ...form, thumbnail: result.assets[0] })
                }
            }

            // Handle the result here
        } catch (error) {
            console.error("Error launching image library", error);
        }
    }
    const submit = async () => {
        if (!form.title || !form.thumbnail || !form.prompt || !form.video) {
            Alert.alert('Please fill all fields')
        }
        setUploading(true)
        try {
            if (!form.valid) {
                await createVideo({ ...form, userId: user.$id });
                router.push('/home')
            }

        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            })
            setUploading(false)
        }

    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 my-4">
                <Text className="text-2xl text-white font-psemibold">
                    Upload Video
                </Text>
                <FormField title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catchy title"
                    handleChangeText={(e) => { setForm({ ...form, title: e }) }}
                    otherStyle="mt-10"
                />
                <View className="mt-5 space-y-2">
                    <Text className="text-base text-gray-100 font-medium">Upload Video</Text>
                    <TouchableOpacity onPress={() => openPicker("Video")}>
                        {form?.video ? (
                            <Video source={{ uri: form.video.uri }} className="w-full h-64 rounded-2xl " resizeMode={ResizeMode.COVER} />
                        ) : (<View className="w-full h-40  bg-black-100 rounded-2xl justify-center items-center px-4">
                            <View className="w-14 h-14  border border-dashed border-secondary-100 justify-center items-center">
                                <Image source={icons.upload} resizeMode='contain' className="h-1/2" />
                            </View>
                        </View>)}
                    </TouchableOpacity>
                </View>
                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-medium">Thumbnail</Text>
                    <TouchableOpacity onPress={() => openPicker("Image")}>
                        {form?.thumbnail ? (
                            <Image source={{ uri: form.thumbnail.uri }} className="w-full h-64 rounded-2xl " useNativeControls resizeMode="cover" isLooping />
                        ) : (<View className="w-full h-16 border-2  flex-row space-x-2  bg-black-100 rounded-2xl justify-center items-center px-4 border-black-200">

                            <Image source={icons.upload} resizeMode='contain' className="h-5 w-5" />
                            <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                        </View>)}
                    </TouchableOpacity>
                </View>
                <FormField title="AI Prompt"
                    value={form.prompt}
                    placeholder="Video Generation Prompt"
                    handleChangeText={(e) => { setForm({ ...form, prompt: e }) }}
                    otherStyle="mt-7"
                />
                <CustomButton title="Submit & Publish" handlePress={submit} containerStyle="mt-7" isLoading={Uploading} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create
