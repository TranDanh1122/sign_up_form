import React from "react";
import Input from "./Input";
import Button from "../button/Button";
import useFormValidate from "../hook/useFormValidate";
const Field = [
    { name: "first_name", placeHolder: "First Name", },
    { name: "last_name", placeHolder: "Last Name" },
    { name: "email", placeHolder: "Email" },
    { name: "password", placeHolder: "Password" },
]
const Form: React.FC = (): React.JSX.Element => {
    const { valid, isValidField, isValidForm }: any = useFormValidate({
        first_name: { isValid: true, errorText: null },
        last_name: { isValid: true, errorText: null },
        email: { isValid: true, errorText: null },
        password: { isValid: true, errorText: null }
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        await isValidForm(formData);
        console.log("Form submitted:");
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} action="#" className="p-10 bg-white rounded-xl shadow-md flex flex-nowrap gap-5 items-center justify-start flex-col" >
            {
                Field.map((element) => (
                    <Input
                        isValid={valid[element.name].isValid}
                        errorText={valid[element.name].errorText}
                        key={element.name}
                        placeHolder={element.placeHolder}
                        name={element.name}
                    />
                ))
            }
            < Button text="Claim your free trial" type="submit" />
            <p className=" text-grayishBlue text-[0.75rem]">By clicking the button, you are agreeing to our <a href="#" className="text-red">Terms and Services</a></p>

        </form >
    )
}
export default Form;