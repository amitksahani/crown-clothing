import { useState, createContext, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        // addCollectionAndDocuments('categories', SHOP_DATA)
        getCategoriesMap()
    },[])

    const value = {categoriesMap}

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}