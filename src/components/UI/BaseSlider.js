import styles from './BaseSlider.module.css'

const BaseSlider = () => {
    const toggleSlider = () => {
        console.log('clicked')
    }
    
   return (
       <div className={styles['sidebar_salary_slider_button_root']} onClick={toggleSlider}>
           <label htmlFor="salarySlider" className={styles['sidebar_salary_slider_button_container']}>
               <input type="checkbox" id='salarySlider'/>
               <span className={styles['slider_button']}></span>
           </label>
       </div>
   )
}

export default BaseSlider