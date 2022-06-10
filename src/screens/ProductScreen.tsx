import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    //State para manejar la url de la imagen sacada con la camara del celular
    const [tempUri, setTempUri] = useState<string>('');

    //Se inicializan en vacío por si el usuario toca en agregar nuevo producto
    const { id = '', name = '' } = route.params;

    const { categories } = useCategories();

    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext);

    //Hook manejo del formulario
    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });

    useEffect(() => {
        navigation.setOptions({
            title: (nombre) ? nombre : 'New Product',
            headerBackTitle: ' '
        })
    }, [nombre])

    const loadProduct = async () => {
        if (_id.length === 0) return;
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            nombre: nombre,
            img: product.img || ''
        });
    }

    useEffect(() => {
        loadProduct();
    }, [])

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            await updateProduct(categoriaId, nombre, id);
        } else {
            const categoriaIdTemporal = categoriaId || categories[0]._id;
            const newProduct = await addProduct(categoriaIdTemporal, nombre);
            onChange(newProduct._id, '_id');
        }
    }

    //Funcion para sacar fotos
    const takePhoto = () => {
        //launCamera recibe 2 parámetros, el primero es un objeto con las opciones de la cámara
        //el segundo es un callback que se ejecuta cuando la cámara se cierra
        launchCamera({
            mediaType: 'photo',
            quality: 0.5
            },
            resp => {
                if (resp.didCancel) return;
                if (!resp.assets?.[0].uri) return
                setTempUri(resp.assets?.[0].uri);
                uploadImage(resp, _id);
        });
    }

    //Funcion para agarrar fotos de la galeria
    const selectPhotoFromGallery = () => {
        //launCamera recibe 2 parámetros, el primero es un objeto con las opciones de la cámara
        //el segundo es un callback que se ejecuta cuando la cámara se cierra
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
            },
            resp => {
                if (resp.didCancel) return;
                if (!resp.assets?.[0].uri) return
                setTempUri(resp.assets?.[0].uri);
                uploadImage(resp, _id);
        });
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Product name:</Text>
                <TextInput
                    placeholder='Product'
                    style={styles.input}
                    placeholderTextColor="#555"
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                {/* Option Picker */}
                {/* Se utilizó la librería react-native-picker */}
                <Text style={styles.label}>Category:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={categoriaId}
                        onValueChange={(value) => onChange(value, 'categoriaId')}
                    >
                        {
                            categories.map((category) => (
                                <Picker.Item key={category._id} label={category.nombre} value={category._id} />
                            ))
                        }
                    </Picker>
                </View>

                {/* Image */}
                {
                    (img.length > 0 && !tempUri ) && (
                        <>
                            <Text style={styles.label}>Image:</Text>
                            <Image
                                source={{ uri: img }}
                                style={styles.image}
                            />
                        </>
                    )
                }

                {/* Temporal Image */}
                {
                     tempUri ?  (
                        <>
                            <Text style={styles.label}>Image:</Text>
                            <Image
                                source={{ uri: tempUri }}
                                style={styles.image}
                            />
                        </>
                    ) : null
                    
                }


                {/* Camera & Gallery */}
                {
                    _id.length > 0 && (

                        <View style={styles.optionsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={takePhoto}
                            >
                                <Text style={styles.optionsText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={selectPhotoFromGallery}
                            >
                                <Text style={styles.optionsText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }

                {/* Save */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={saveOrUpdate}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151217',
        paddingHorizontal: 20,
        margin: 10,
        paddingTop: 20,
        borderRadius: 20
    },
    label: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        marginVertical: 10,
        padding: 12,
        color: 'black',
        backgroundColor: '#fff'
    },
    buttonContainer: {
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: 22,
        marginVertical: 10
    },
    pickerItem: {
        color: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 20,
        borderRadius: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: "#9c2c9a",
        backgroundColor: '#BE3487',
        padding: 10,
        width: 200,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 200
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: 'bold'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20
    },
    optionsText: {
        color: "#decfad",
        fontSize: 16,
        marginHorizontal: 10
    }
})
