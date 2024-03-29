import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import ProductCard from '../../components/product-card/product-cart.component'
import { selectCategoriesMap } from '../../store/categories/category.selector'

const Category = () => {
    
    const {category} = useParams()
    const categoriesMap  = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])
   
    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [categoriesMap, category])

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
            {
                products && products.map((product)=><ProductCard key={product.id} product={product} />)
            }
            </div>
        </>
    )
}

export default Category