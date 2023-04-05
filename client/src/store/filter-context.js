import { createContext } from "react";

const FilterContext = createContext({
    categories: [],
    hasData: false,
    isChecked: false
})

export default FilterContext;