import styled, { css} from "styled-components";
import { Link, NavLink } from "react-router-dom";

const styleLinks = css`
    display: block;
    text-decoration: none;
    padding: 0.75rem 1.75rem;
    font:inherit;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 0.5rem;

    &.active {
        font-weight: 700;
    }
`

/* NAVIGATION LINKS START */
export const NavigationLink = styled(NavLink)`
    ${styleLinks}
`

export const NavigationLinkAsButton = styled(NavigationLink)`
    background-color: #EBF3FF;
    color: #304FFE;

    &:active,
    &:hover {
        background-color: #DAE9FF;
        border: none;
        opacity: .95;
    }

    &.active {
        font-weight: 700;
        background-color: #DAE9FF;
    }
`

/* NAVIGATION LINKS END */

/* LINKS START */

export const StyledLink = styled(Link)`
    ${styleLinks}
`

export const RoundedLink = styled(StyledLink)`
    background-color: #304FFE;
    border: none;
    border-radius: 50px;
    color: #FFFFFF;

    &:active,
    &:hover {
        background-color: #233CC8;
        border: none;
    }
`
/* LINKS END */
