import styled, { css } from "styled-components";

export const Badge = styled.span`
    display: flex;
    min-width: 120px;
    height: 40px;
    border-radius: 15px;
    align-items: center;
    background-color: ${props=> props.bgColor ? props.bgColor : 'var(--darker-gray-color)'};
    
    ${ (props) => {
        switch ( props['$mode'] ) {
            case 'one_item': 
                return css`
                    justify-content: center;
                    padding: 0.5px 1px;
                `
            case 'one_item_small':
                return css`
                    justify-content: center;
                    padding: 0.3px 0.6px;
                    min-width: 50px;
                    height: 16px;
                    border-radius: 10px;
                `
            case 'multiple_items':
                return css`
                    justify-content: space-around;
                    padding: 3px 1.5px;
                `
        }
    } }
`

export const CounterBadge = styled(Badge)`
    background: var(--nav-btn-bg-color);
    color: var(--green-text-color);
    font-weight: 700;
    font-size: var(--title-font-size);
    border-radius: 30px;
    width: 100px;
`

export const RemoteBadge = styled(CounterBadge)`
    background-color: #CEF5D9;
    color: #127C30;
`

export const WorkCategoryBadge1 = styled(CounterBadge)`
    background-color: #3d008d;
    color: white;
`

export const WorkCategoryBadge2 = styled(CounterBadge)`
    background-color: #71008d;
    color: white;
`

export const WorkCategoryBadge3 = styled(CounterBadge)`
    background-color: #8d006e;
    color: white;
`
