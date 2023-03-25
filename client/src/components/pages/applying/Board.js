import React, { useEffect, useState, useCallback } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";
import BaseDialog from "../../UI/BaseDialog";
import BaseSpinner from "../../UI/BaseSpinner";

//UI components
import { RoundedLink } from "../../UI/BaseLinks";

//token
import { getAuthToken } from "../../../util/auth";

const Board = () => {
    const [categories, setCategories] = useState([])
    const {isLoading, error, sendRequest: fetchCategories, resetError} = useHttp()
    
    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async () => {
      await fetchCategories('/categoryData/categories','GET', transformCategoryData)
    }
    
    const transformCategoryData = (data) => {
        setCategories(data.items)
    }
    
    return (
        <React.Fragment>
            {error && <BaseDialog show={!!error} onCloseDialog={resetError} fixed={false} title={getAuthToken() === 'EXPIRED' ? 'Your session expired!' : 'Something went wrong with fetching the Categories!'}>{ getAuthToken() === 'EXPIRED' ? 'Reload the page and sign in again' : error }</BaseDialog>}
            {/*TODO MAYBE REPLACE WITH A SKELETON LOADING*/}
            {isLoading && <BaseSpinner />}
            <section className={styles['homepage_main']}>
                <div className={styles['show_all_btn_wrapper']}>
                    <RoundedLink
                        to={'posters?page=1'}
                        className={styles['show_all_btn']}
                    >
                        See the grouped posters
                    </RoundedLink>
                </div>
                <div className={`${styles['homepage_categories']}`}>

                    { categories.map((category, index) =>
                        <BoardItem key={index} category={category}/>
                    )}
                </div>
            </section>
        </React.Fragment>
    )
}

export default Board;