import styles from './AuthForm.module.scss';

//UI components
import { Input } from "../layout/Input";
import { OutlineButton, Button } from "../UI/BaseButton";

const AuthForm = () => {
    return (
        <form action="" className={styles['apply_form']}>
            <div className={styles['form-control']}>
                <label htmlFor="email">Email*</label>
                <Input typeCat='email' id='email' name='email'/>
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="pass">Password*</label>
                <Input typeCat='password' id='pass' name='pass'/>
            </div>
            <div className={styles['form-actions']}>
                <Button className={styles['form-main-btn']}>Login</Button>
                <OutlineButton className={styles['form-second-btn']}>Signup instead</OutlineButton>
            </div>
        </form>
    )    
}

export default AuthForm;