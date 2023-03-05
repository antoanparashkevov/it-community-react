import styles from './BaseSlider.module.css'
import { useEffect, useState } from "react";

const BaseSlider = ({ onTriggerSlider, isChecked }) => {
    
    const [isSliderChecked, setIsSliderChecked] = useState(isChecked)
    
    const toggleSlider = (event) => {
        setIsSliderChecked(event.target.checked) 
    }

    useEffect( () => {
        onTriggerSlider(isSliderChecked)
    }, [isSliderChecked])
    
   return (
       <div className={styles['sidebar_salary_slider_button_root']} onClick={toggleSlider}>
           <label htmlFor="salarySlider" className={styles['sidebar_salary_slider_button_container']}>
               <input type="checkbox" id='salarySlider' defaultChecked={isChecked}/>
               <span className={styles['slider_button']}></span>
           </label>
       </div>
   )
}

export default BaseSlider