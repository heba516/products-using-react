import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  bg: string;
}
const CircleColor = ({ bg, ...rest }: IProps) => {
  return (
    <span
      style={{ backgroundColor: bg }}
      className={`block w-5 h-5 rounded-full cursor-pointer`}
      {...rest}
    ></span>
  );
};

export default CircleColor;
