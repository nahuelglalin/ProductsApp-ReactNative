import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    const getCaterogies = async () => {
        const resp = await api.get<CategoriesResponse>('/categorias');
        setCategories(resp.data.categorias);
        setIsLoading(false);
    }

    useEffect(() => {
        getCaterogies();
    }, [])
    

    return {categories, isLoading}
}
