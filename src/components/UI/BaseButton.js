import {Link} from "react-router-dom";

const BaseButton = (props) => {
    const chosenButton = () => {
        if(!props.link) {
            return <button type={props.type ? props.type : 'button'} className={props.mode}>{props.children}</button>
        }
        return <Link to={props.to} className={props.mode}>{props.children}</Link>
    };
    
    return chosenButton()
}

export default BaseButton;