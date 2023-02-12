import React from "react";
import styles from './Board.module.css'

//components
import BaseButton from "../UI/BaseButton";

const Board = () => {
    let array = [1,2,3,4]
    return (
          <section className={styles['homepage_main']}>
              
              <div className={`${styles['homepage_categories']}`}>

                  { array.map((item, index) => 
                      <article className={styles['homepage_category']} key={index}>

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
                              {array.map((item, index)=> <div className={styles['homepage_category_subcategory_wrapper']} key={index}>

                                  <span className={styles['homepage_category_subcategory_title']}>Java</span>

                                  <div className={styles['homepage_category_subcategory_counter_wrapper']}>
                                      <h1 className={styles['homepage_category_subcategory_counter']}>1234</h1>
                                  </div>

                              </div> )}
                          </div>

                          <div className={styles['homepage_category_show_all_btn_wrapper']}>
                              <BaseButton 
                                  link
                                  mode='rounded' 
                                  to='/posters'
                              >
                                  Show all
                              </BaseButton>
                          </div>
                      </section>
                  </article> ) }
              </div>
          </section>
    )
}

export default Board;