import styles from './ApplyForm.module.css';
import styled from "styled-components";


//UI components
import { FlatButton } from "../UI/BaseButton";

const Input = styled.input.attrs((props)=> ({
    type: props.typeCat ||  'text'
}))`
    width: 100%;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font: inherit;
    
    &:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }
`

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
                <Input typeCat='password' id='email' name='email'/>
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