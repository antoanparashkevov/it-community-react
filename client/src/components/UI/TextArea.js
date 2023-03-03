import styled from "styled-components";
import { Input } from "../layout/Input";

export const TextArea = styled(Input).attrs((props) => ({
    rows: props['rows_count'] || 10,
    cols: props['cols_count'] || 25,
    as: 'textarea'
}))`
    height: 200px;
    max-height: 200px;
    min-width: 100%;
    max-width: 100%;
`