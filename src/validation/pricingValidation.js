import * as Yup from "yup";
export const pricingSchema = Yup.object().shape({
    name:Yup.string().required("Please enter a otp number"),
    sessions:Yup.string().required("Please enter the number of sessions"),
    benefits:Yup.string().required("Please enter the benefints"),
    price:Yup.string().required("Please enter the price")
})