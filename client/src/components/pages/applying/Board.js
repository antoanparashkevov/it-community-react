import React, { useEffect, useState } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";

const Board = () => {
    const [categories, setCategories] = useState([
        {
            title: 'Backend Development',
            counter: 1234,
            sub_categories: [
                {
                    title: 'Java',
                    counter: 1234
                },
                {
                    title: 'PHP',
                    counter: 1111
                },
                {
                    title: 'C#',
                    counter: 1233
                },
                {
                    title: 'Python',
                    counter: 1239
                }
            ]
        },
        {
            title: 'Frontend Development',
            counter: 123123,
            sub_categories: [
                {
                    title: 'Javascript',
                    counter: 1234
                },
                {
                    title: 'Vue',
                    counter: 1111
                },
                {
                    title: 'Angular',
                    counter: 1233
                },
                {
                    title: 'React',
                    counter: 1239
                }
            ]
        },
        {
            title: 'QA',
            counter: 123141,
            sub_categories: [
                {
                    title: 'Automation QA',
                    counter: 1234
                },
                {
                    title: 'Manual QA',
                    counter: 1111
                },
            ]
        },
        {
            title: 'Infrastructure',
            counter: 21421,
            sub_categories: [
                {
                    title: 'DevOps',
                    counter: 1234
                },
                {
                    title: 'Cybersecurity',
                    counter: 1111
                },
                {
                    title: 'SysAdmin',
                    counter: 1233
                },
                {
                    title: 'DB Engineer',
                    counter: 1239
                }
            ]
        },
    ])
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

                  { categories.map((category, index) => 
                     <BoardItem key={index} category={category}/>
                  )}
              </div>
          </section>
    )
}

export default Board;