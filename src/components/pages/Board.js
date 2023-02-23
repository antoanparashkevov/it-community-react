import React from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../applying/BoardItem";

//UI components
import { RoundedLink } from "../UI/BaseLinks";

const Board = () => {
    let array = [1,2,3,4]
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