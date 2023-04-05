import * as Yup from "yup";
export const otpSchema = Yup.object().shape({
    otpis:Yup.string().required("Please enter a otp number")
})