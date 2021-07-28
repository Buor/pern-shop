import styled from "styled-components";

export interface IWH {
    width?: number,
    height?: number
}
export const WH = styled.div<IWH>`
  ${props => props.width ? `width: ${props.width}px;` : ""}
  ${props => props.height ? `height: ${props.height}px;` : ""}
`
