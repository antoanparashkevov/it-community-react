import React, { useEffect, useState, useCallback } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";

const Board = () => {
    const [categories, setCategories] = useState([])
    const {isLoading, error, sendRequest: fetchCategories} = useHttp()
    
    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = useCallback(async () => {
      await fetchCategories('/categoryData/categories','GET', transformCategoryData)
    }, [])
    
    const transformCategoryData = (data) => {
        setCategories(data)
    }
    
    return (
          <section className={styles['homepage_main']}>
              
              <div className={`${styles['homepage_categories']}`}>

                  { categories.map((category, index) => 
                     <BoardItem key={index} category={category}/>
                  )}
              </div>
          </section>
    )
}

export default Board;