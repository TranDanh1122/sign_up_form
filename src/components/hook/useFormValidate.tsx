import React from "react";
interface ValidationState {
    [key: string]: { isValid: boolean; errorText: string | null };
}
const useFormValidate = (initialState: ValidationState): object => {
    const [valid, setValid] = React.useState(initialState);

    const isValidField = (type: string, value: string, message: string | null): ValidationState[keyof ValidationState] => {
        let errorText = ""
        let isFieldValid = true;
        value = typeof value === "string" ? value.trim().toString() : "null";
        if (!value) {
            isFieldValid = false;
            errorText = "This field is required";
        } else if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
            isFieldValid = false;
            errorText = "Please enter a valid email address";
        } else if (type === "password" && value.length < 8) {
            isFieldValid = false;
            errorText = "Password must be at least 8 characters";
        }
        setValid(() => ({ ...valid, type: { isValid: isFieldValid, errorText: errorText } }))
        return { isValid: isFieldValid, errorText: message ?? errorText }
    }
    const isValidForm = (data: object) => {
        const newState: ValidationState = { ...valid };
        let formValid = true;
        Object.entries(data).forEach(([key, value]) => {
            newState[key] = isValidField(key, value as string, null);
            if (!newState[key].isValid) formValid = false;
        });
        setValid(newState);
        return formValid;
    }
    return { valid, isValidField, isValidForm }
}
export default useFormValidate;