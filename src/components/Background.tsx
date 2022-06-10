import React from 'react';
import { View } from 'react-native';

export const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                top: -250,
                width: 1000,
                height: 1200,
                backgroundColor: '#20072b',
                transform: [{ rotate: '-70deg' }],
            }}
        />
    )
}
