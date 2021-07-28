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

interface ICard {
    border?: string
    padding?: string
    borderRadius?: string
}

export const Card = styled.div<ICard>`
  ${props => props.border ? `border: ${props.border};` : `border: 1px solid black;`}
  ${props => props.padding ? `padding: ${props.padding};` : `padding: 10px;`}
  ${props => props.borderRadius ? `border-radius: ${props.borderRadius};` : `border-radius: 10px;`}
`