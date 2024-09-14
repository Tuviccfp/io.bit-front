import * as React from "react";
import { z } from "zod";
import axios from "axios";
import letsStarts from '../../assets/lets-start-illustration.svg';
import icon from '../../assets/logo-in-orbit.svg'
import './style.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const formDataSchema = z.object({
  email: z
    .string()
    .min(1, "É necessário incluir um e-mail")
    .email("Formato de e-mail inválido: test@example.com"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(20, "A senha não pode ter mais de 20 caracteres"),
});

type FormData = z.infer<typeof formDataSchema>;

const tokenValidate = z.object({
  token: z.string().min(1, "Token é necessário"),
})


export default function Login() {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const formValidate = formDataSchema.safeParse(formData);
        const url = import.meta.env.VITE_API_URL
        if (!formValidate.success) {
          const validationsError = formValidate.error.format();
          setErrors({
            email: validationsError?.email?._errors[0],
            password: validationsError?.password?._errors[0],
          });
          return;
        }
        const result = await axios.post(`${url}/login`, {
            email: formData.email,
            password: formData.password
        })
        const parsedResult = tokenValidate.parse(result.data)
        Cookies.set("Authorization", parsedResult.token)
        setFormData({ email: '', password: '' });
        setErrors({});
        navigate('/profile')
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <section className="section-acess">
        <img src={icon} alt="icon-logo"/>
        <article>
        <img src={letsStarts} alt="icon-letstart"/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </label>
          <input type="submit" value={'Entrar'}/>
        </form>  
        </article>
    </section>
    );
}
