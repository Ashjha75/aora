import { ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''

    });
    const submit = () => { }
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="flex  justify-center min-h-[85vh] px-4 my-6">
                    <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up To Aora</Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyle="mt-10"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyle="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyle="mt-7"
                        keyboardType="password"
                    />
                    <CustomButton title="Sign Up" containerStyle="mt-7" handlePress={submit} isLoading={isSubmitting} />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account? <Link href="/sign-in" className="text-secondary">Sign In</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
