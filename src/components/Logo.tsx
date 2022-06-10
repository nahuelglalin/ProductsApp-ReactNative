import React from 'react'
import { Image, View } from 'react-native'

export const Logo = () => {
  return (
    <View style={{
        alignItems: 'center'
    }}>
        <Image 
            source={require('../assets/vector.png')}
            style={{
                width: 100,
                height: 100,
            }}
        />
    </View>
  )
}
