import styled from "styled-components"

interface IFlex {
    justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    flexDirection?: "row" | "column";
    width?: number;
}

export const Flex = styled.div<IFlex>`
  display: flex;
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "stretch"};;
  flex-direction: ${props => props.flexDirection || "row"};
  width: ${props => props.width || "auto"}px;
`

interface IContainer {
    maxWidth: number,
    safePadding?: number,
}

export const Container = styled.div<IContainer>`
  margin: 0 auto;
  max-width: ${props => props.maxWidth}px;
  padding: 0 ${props => props.safePadding}px;
`