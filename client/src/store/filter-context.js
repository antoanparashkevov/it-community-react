import React from "react";

const FilterContext = React.createContext({
    categories: [],
    hasData: false,
    isChecked: false
})

export default FilterContext;