import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

export const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts } = useContext(ProductsContext);

    //Pull To Refresh
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ ...styles.addBtn, marginRight: 20 }}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                >
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            )
        })
    }, [])

    const loadProductsFromBackend = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}

                ItemSeparatorComponent={() => <View style={styles.separator} />}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={loadProductsFromBackend}
                        progressViewOffset={20}
                        colors={['#fff']}
                        tintColor={'#fff'}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        margin: 10,
        paddingTop: 20,
        borderRadius: 20
    },
    productName: {
        fontSize: 20,
        color: '#fff',
    },
    separator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    addBtn: {
        borderWidth: 1,
        borderColor: "#9c2c9a",
        backgroundColor: '#BE3487',
        padding: 10,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
    },
    addBtnText: {
        color: '#fff'
    }
})