import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Loader = () => {
    return (
        <View style={tw`flex-1 justify-center items-center bg-[#193549]`}>
            <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
    );
};

export default Loader;