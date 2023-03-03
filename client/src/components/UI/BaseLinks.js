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
    background-color: var(--nav-btn-bg-color);
    color: var(--blue-text-color);

    &:active,
    &:hover {
        background-color: var(--nav-hover-btn-bg-color);
        border: none;
        opacity: .95;
    }

    &.active {
        font-weight: 700;
        background-color: var(--nav-hover-btn-bg-color);
    }
`

/* NAVIGATION LINKS END */

/* LINKS START */

export const StyledLink = styled(Link)`
    ${styleLinks}
`

export const RoundedLink = styled(StyledLink)`
    background-color: var(--blue-text-color);
    border: none;
    border-radius: 50px;
    color: var(--header-bg-color);

    &:active,
    &:hover {
        background-color: var(--purple-bg-color);
        border: none;
    }
`
/* LINKS END */
