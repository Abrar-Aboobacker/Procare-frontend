import * as Yup from "yup";

export const DoctorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your Name is too Short")
    .max(50, "Your Name is too long!")
    .required("Required"),

  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(4, "password must be between 4-10")
    .max(10, "password must be between 4-10")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*_\-?])(?=.{4,10}$)/,
      ", One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password"),
    cpassword: Yup.string()
.oneOf([Yup.ref('password'), null], 'Passwords must match'),
  phone: Yup.string().required("Please enter your phone number")
    .matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "please enter a valid number"
  ),
  about:Yup.string().required('Please write your self').min(20,"20 letters minimum required")
});
