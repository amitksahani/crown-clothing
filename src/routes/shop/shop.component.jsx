import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import {useDispatch} from 'react-redux'
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { setCategories } from "../../store/categories/category.action"

const Shop = () =>{

    const dispatch = useDispatch()

    useEffect(()=>{
      const getCategoriesMap = async () => {
          const categories = await getCategoriesAndDocuments()
          dispatch(setCategories(categories))
      }
      getCategoriesMap()
    },[])

    return (
        <Routes>
          <Route index element={<CategoriesPreview />} />
          <Route path=":category" element={<Category />} />
        </Routes>
    )
  }

export default Shop

{/* <div className="products-conatiner">
         {
            categories.map((category)=>(
                <ProductCard key={category.id} product={category} />
            ))
          } 
          </div> */}