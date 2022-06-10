import React, { createContext, useState, useEffect } from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import api from "../api/api";
import { Producto, ProductsResponse, Categoria } from '../interfaces/appInterfaces';

//3.Interfaz de Props
type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<Producto>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( id: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Producto>;
    uploadImage: ( data: ImagePickerResponse, id: string ) => Promise<void>;
}

//4. Crear el Context
export const ProductsContext = createContext({} as ProductsContextProps);

//5. Exponer el proveedor de información
export const ProductsProvider = ({children}: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    

    useEffect(() => {
        loadProducts();
    }, [])
    
    
    const loadProducts = async () => {
        const resp = await api.get<ProductsResponse>('/productos?limite=50');
        setProducts([...resp.data.productos]);
    }

    const addProduct = async ( categoryId: string, productName: string ): Promise<Producto> => {
        const body = {nombre: productName, categoria: categoryId}
        const resp = await api.post<Producto>('/productos', body);
        setProducts([...products, resp.data]);

        return resp.data;
    }

    const updateProduct = async ( categoryId: string, productName: string, productId: string ) => {
        const body = {nombre: productName, categoria: categoryId}
        const resp = await api.put<Producto>(`/productos/${productId}`, body);
        setProducts(products.map(product => {
            return (product._id === productId) ? 
                resp.data : 
                product
            }));
    }

    const deleteProduct = async ( id: string ) => {}

    const loadProductById = async ( id: string ): Promise<Producto> => {
        const resp = await api.get<Producto>(`/productos/${id}`);
        return resp.data;
    }

    //Para subir la imagen al backend
    const uploadImage = async ( data: any, id: string ) => {

        const fileToUpload = {
            uri: data.assets?.[0].uri,
            type: data.assets?.[0].type,
            name: data.assets?.[0].fileName
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        
        try {
            const resp = await api.put<Producto>(`/uploads/productos/${id}`, formData);
            console.log(resp);
        } catch (error) {
            console.log({error})
        }
    }

    return (
        <ProductsContext.Provider 
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
