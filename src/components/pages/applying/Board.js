import React, { useEffect, useState } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";

const Board = () => {
    let array = [1,2,3,4]
    const [categories, setCategories] = useState(null)
    const {isLoading, error, sendRequest: fetchCategories} = useHttp()
    
    useEffect( () => {
        const categoriesTransformation = (data) => {
            setCategories(data)
        }

        fetchCategories(
            {url: 'https://swapi.dev/api/people/1'},
            categoriesTransformation
        );
        
    }, [fetchCategories])
    
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