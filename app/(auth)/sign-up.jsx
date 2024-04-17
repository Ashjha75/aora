import { ScrollView, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignUp = () => {
    const { setUser, setIsLoaggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''

    });
    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('All fields are required');
        }
        if (!isValidEmail(form.email.trim())) {
            console.log("Invalid email address");
            return;
        }
        setIsSubmitting(true);
        try {
            console.log(form.email)
            const result = await createUser(form.password.trim(), form.username.trim(), form.email.trim());
            // set it to global state using context....
            setUser(result);
            setIsLoaggedIn(true);
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally {
            setIsSubmitting(false);
        }
    }
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
                        <Text className="text-lg text-gray-100 font-pregular">Have an account already? <Link href="/sign-in" className="text-secondary">Sign In</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
