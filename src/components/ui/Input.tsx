import { InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: IProps) => {
  return <input className="border" {...rest} />;
};

export default Input;
