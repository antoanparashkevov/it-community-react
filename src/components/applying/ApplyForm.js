import styles from './ApplyForm.module.css';
import styled from "styled-components";


//UI components
import { FlatButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";


const TextArea = styled(Input).attrs((props) => ({
    rows: props['rows_count'] || 5,
    cols: props['cols_count'] || 25,
    as: 'textarea'
}))`
    height: unset;
`

const ApplyForm = () => {
    
    return (
        <form action="" className={styles['apply_form']}>
            <div className={styles['form-control']}>
                <label htmlFor="name">Your name*</label>
                <Input id='name' name='name'/>
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="email">Email*</label>
                <Input typeCat='email' id='email' name='email'/>
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="msg">Your message</label>
                <TextArea id='msg' name='msg'/>
            </div>
            <div className={styles['form-actions']}>
                <FlatButton>Submit</FlatButton>
            </div>
        </form>
    )
}


export default ApplyForm;