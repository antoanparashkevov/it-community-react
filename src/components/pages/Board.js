import React from "react";

import styles from './Board.module.css'

const Board = ()=> {
    let array = [1,2,3,4]
    return (
        <React.Fragment>
          <section className={styles['homepage_main']}>
              
              <div className={`${styles['homepage_categories']}`}>
                  
                  <div className={styles['homepage_category']}>
                      
                      <section className={styles['homepage_category_header']}>
                          
                          <div className={styles['homepage_category_title_wrapper']}>
                              <h1 className={styles['homepage_category_title']}>BACKEND DEVELOPMENT</h1>
                          </div>
                          
                          <div className={styles['homepage_category_counter_wrapper']}>
                              <h1 className={styles['homepage_category_counter']}>1234</h1>
                          </div>
                          
                      </section>
                      
                      <section className={styles['homepage_category_main']}>
                          
                          <div className={styles['homepage_category_main_wrapper']}>
                              {array.map(()=> <div className={styles['homepage_category_subcategory_wrapper']}>

                                  <span className={styles['homepage_category_subcategory_title']}>Java</span>

                                  <div className={styles['homepage_category_subcategory_counter_wrapper']}>
                                      <h1 className={styles['homepage_category_subcategory_counter']}>1234</h1>
                                  </div>

                              </div> )}
                          </div>
                          
                          <div className={styles['homepage_category_show_all_btn_wrapper']}>
                              <button>Show all</button>
                          </div>
                          
                      </section>
                      
                  </div>
              </div>
          </section>
        </React.Fragment>
    )
}

export default Board;