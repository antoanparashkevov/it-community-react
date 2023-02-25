import React, { useEffect, useState } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";

const Board = () => {
    let array = [1,2,3,4]
    const [categories, setCategories] = useState(null)
    const {isLoading, error, get: fetchCategories} = useHttp()
    
    useEffect(  () => {
        const categoriesResponseConverter = (data) => {
            setCategories(data)
        }
        
        fetchCategories('people/1', categoriesResponseConverter);
        
        
    }, [])
    
    return (
          <section className={styles['homepage_main']}>
              
              <div className={`${styles['homepage_categories']}`}>

                  { array.map((item, index) => 
                     <BoardItem key={index}/>
                  )}
              </div>
          </section>
    )
}

export default Board;