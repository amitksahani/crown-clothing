import { createAction } from "../../utils/reducers/reducers.utils"
import { CATEGORIES_ACTION_TYPES } from "./category.types"

export const setCategories = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories)
}