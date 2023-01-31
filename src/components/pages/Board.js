import React from "react";

import styles from './Board.module.css'

const Board = ()=> {
    return (
        <React.Fragment>
          <section className={styles['homepage_main']}>
              <div 
                  className={`${styles['homepage_wrapper']} ${styles['homepage_main_wrapper']}`}
              >
                  <h1>board</h1>
              </div>
          </section>
        </React.Fragment>
    )
}

export default Board;