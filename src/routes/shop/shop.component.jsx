import { Routes, Route } from "react-router-dom"
import { CategoriesProvider } from "../../contexts/categories.context"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

const Shop = () =>{


    return (
      <CategoriesProvider>
        <Routes>
          <Route index element={<CategoriesPreview />} />
          <Route path=":category" element={<Category />} />
        </Routes>
      </CategoriesProvider>
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