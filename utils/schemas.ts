import { ref, object, string } from "yup";

export const loginSchema = object({
  email: string()
    .required('Required')
    .email('Invalid email'),
  password: string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
})

export const registerSchema = object({
  email: string()
    .required('Required')
    .email('Invalid email'),
  password: string()
    .required('Required')
    .min(8, 'Must be at least 8 characters'),
  passwordConfirmation: string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
    .oneOf([ref('password')], 'Passwords must match')
})