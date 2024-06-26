import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getLoggedInUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
    const { setUser, setIsLoaggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        let newErrors = {};
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        // Only return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const submit = async () => {
        validateForm();
        if (!isValidEmail(form.email.trim())) {
            console.log("Invalid email address");
            return;
        }
        setIsSubmitting(true);
        try {
            await signIn(form.email.trim(), form.password.trim());
            // set it to global state using context....
            const result = await getLoggedInUser();
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
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in To Aora</Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyle="mt-7"
                        keyboardType="email-address"
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyle="mt-7"
                        keyboardType="password"
                    />
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                    <CustomButton title="Sign In" containerStyle="mt-7" handlePress={submit} isLoading={isSubmitting} />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account? <Link href="/sign-up" className="text-secondary">Sign Up</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({})