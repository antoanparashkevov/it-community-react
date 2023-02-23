import styled, { css } from "styled-components";

export const Badge = styled.span`
    display: flex;
    min-width: 120px;
    height: 40px;
    border-radius: 15px;
    align-items: center;
    background-color: ${props=> props.bgColor ? props.bgColor : '#F4F4F4'};
    
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
    background: #EBF3FF;
    color: #B3CE66;
    font-weight: 700;
    font-size: 15px;
    border-radius: 30px;
    min-width: 100px;
`