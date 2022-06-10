import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const LoadingScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0c0a0d' }}>
            <ActivityIndicator
                size={50}
                color='#999999'
            />
        </View>
    )
}
