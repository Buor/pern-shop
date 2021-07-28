import styled from "styled-components";

interface IButton {
    backgroundColor?: string
    borderRadius?: number
    color?: string
    padding?: string,
    hover?: "base"
}

export const Button = styled.button<IButton>`
  background-color: ${props => props.backgroundColor || props.theme.palette.success};
  color: ${props => props.color || props.theme.palette.primary};
  ${props => props.borderRadius ? `border-radius: ${props.borderRadius}px;` : ""}
  cursor: pointer;
  ${props => props.padding ? `padding: ${props.padding};` : ""}
  border: 0;
  outline: none;

  &:hover {
    background-color: ${props => props.theme.palette.successLight};
  }
`;

interface IInput {
    borderRadius?: number
    margin?: string
}

export const Input = styled.input<IInput>`
  border-radius: ${props => props.borderRadius || 0}px;
  margin: ${props => props.margin || ""}
  
  border: 0;
  outline: none;
`