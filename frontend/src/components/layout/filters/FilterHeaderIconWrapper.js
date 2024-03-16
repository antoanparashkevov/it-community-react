import Arrow from "../../UI/BaseArrow";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FilterHeaderIconWrapper = ({className, title, onExpanded, hideArrow}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const expandCollapseCategories = () => {
        setIsExpanded(!isExpanded)
    }
    
    useEffect( () => {
        onExpanded(isExpanded)
    }, [isExpanded])
    
    return (
        <div className={className} onClick={expandCollapseCategories}>
            <h1>{ title }</h1>
            {!hideArrow && <Arrow $rotate={!isExpanded} />}
        </div>
    )
}

export const StyledFilterHeaderIconWrapper = styled(FilterHeaderIconWrapper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    
    & > h1 {
        font-size: 16px;
        font-weight: normal;
        letter-spacing: 1px;
        color: #374FFE;
    }
`