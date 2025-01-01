import React from "react";
interface ButtonProps {
    text: string,
    type: "submit" | "button",
    onClick?: () => void
}
const Button = (buttonProps: ButtonProps): React.JSX.Element => {
    return (
        <button className="font-semibold rounded-md leading-8 text-white bg-green hover:bg-green/50 uppercase py-4 w-full" onClick={buttonProps.onClick} type={buttonProps.type} >{buttonProps.text}</button>
    )
}
export default Button;