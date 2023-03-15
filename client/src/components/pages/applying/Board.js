import React, { useEffect, useState, useCallback } from "react";
import styles from './Board.module.css'

//components
import BoardItem from "../../applying/BoardItem";

//hooks
import useHttp from "../../../hooks/use-http";
import BaseDialog from "../../UI/BaseDialog";
import BaseSpinner from "../../UI/BaseSpinner";

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
            {/* TODO FOR ALL ROUTES ?*/}
            {error && <BaseDialog show={!!error} onCloseDialog={resetError} fixed={false} title={getAuthToken() === 'EXPIRED' ? 'Your session expired!' : 'Something went wrong with fetching the Categories!'}>{ getAuthToken() === 'EXPIRED' ? 'Reload the page and sign in again' : error }</BaseDialog>}
            {/*TODO MAYBE REPLACE WITH A SKELETON LOADING*/}
            {isLoading && <BaseSpinner />}
            <section className={styles['homepage_main']}>
            {/*TODO WHEN WE CLICK A SHOW ALL BUTTON FOR A SPECIFIC CATEGORY, TO FILTER OUT ONLY THOSE JOBS WITH THE SAME CATEGORY. WHEN A USER CLICKS AND ENTER, TO HIDE THE CATEGORY FILTER BECAUSE IT IS NOT NEEDED*/}
            {/*TODO ADD A SHOW ALL BUTTON ABOVE THE CATEGORIES TO SHOW ALL LISTS FOR ALL CATEGORIES*/}
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