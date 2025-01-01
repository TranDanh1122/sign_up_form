import React, { useEffect } from "react";
import clsx from "clsx"
interface InputProps {
    placeHolder: string,
    errorText?: string,
    name: string,
    isValid?: boolean,
}
const Input: React.FC<InputProps> = (inputProps: InputProps): React.JSX.Element => {
    const [status, setStatus] = React.useState("clean");
    const [value, setValue] = React.useState("")
    useEffect(() => {
        if (!inputProps.isValid ) setStatus("inValid");
        else if (value) setStatus("valid");
        else setStatus("clean");
    }, [value, inputProps.isValid])
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setStatus(val ? "dirty" : "clean");
        setValue(val)
    }
    return (
        <div className="w-full relative">
            <input onChange={(e) => handleInput(e)} className={clsx("w-full font-semibold tracking-[0.25px] leading-6 text-[0.875rem] py-4 px-8 rounded-md border-solid border-[1px] hover:border-darkBlue",
                {
                    "border-red": status == "inValid",
                    "border-green": status == "valid",
                    "border-[#DEDEDE]": status == "clean"

                })} type="text" placeholder={inputProps.placeHolder} name={inputProps.name} value={value} />
            <span className={clsx("text-red font-medium text-[0.75rem] top-full left-0", {
                "hidden": status == "valid" || status == "clean" || status == "dirty",
                "block": status == "inValid"
            })}>{inputProps.errorText}</span>
            <span></span>
        </div>
    )
}
export default Input;