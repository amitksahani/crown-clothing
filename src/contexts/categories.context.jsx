import { useState, createContext, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({})

    const value = {categoriesMap}

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}