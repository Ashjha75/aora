import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-[#1f4662]">
            <Text className="text-3xl text-yellow-500 font-pblack">Aora!</Text>
            <StatusBar style="auto" />
            <Link href="/home" style={{ color: 'blue' }}>
                <Text>Go To Home</Text>
            </Link>

        </View >
    );
}

