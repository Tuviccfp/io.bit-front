import * as React from "react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import "./style.css";
import { z } from "zod";
import axios from "axios"
import Cookies from "js-cookie";

const goalsCreateSchema = z.object({
    title: z.string().min(1, 'Titulo da tarefa deve conter ao menos um caracteres'),
    desiredWeeklyFrequency: z.number().min(0, 'Frequencia da meta deve ser um numero maior que zero'),
})

type GoalsCreateData = z.infer<typeof goalsCreateSchema>;
const url = import.meta.env.VITE_API_URL
export default function CreateGoalsComponent() {
 const [formGoals, setFormGoals] = React.useState<GoalsCreateData>({
    title: "",
    desiredWeeklyFrequency: 0,
  });
  const [isList, setIsList] = React.useState<boolean>(false);
  const handleIsList = () => {
    setIsList(!isList);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormGoals((prevFormData) => ({...prevFormData, [name]: name === 'desiredWeeklyFrequency' ? Number(value) : value}))
  } 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.post(`${url}/create-goals`, formGoals, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Cookies.get('Authorization')}` }  })
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <nav className="create-goals-nav">
      <button type="button" onClick={handleIsList}>
        <DotsThreeOutlineVertical size={22} color="#f5f3ff" />
      </button>
      <div className={`create-goals-component  ${isList ? "show" : "hidden"}`}>
        <span>
          <h4>Cadastrar metas</h4>
          <p>
            Adicione atividades que <u>te fazem bem</u> e que você deseja
            continuar praticando.
          </p>
        </span>

        <form onSubmit={handleSubmit}>
          <label htmlFor="create-goals">
            Qual a atividade?
            <input
              type="text"
              id="create-goals"
              name="title" // Definindo o name para ser capturado
              placeholder="Praticar atividades físicas, meditação... etc"
              onChange={handleChange}
            />
          </label>

          <div className="checkbox-personalite">
            <p>Quantas vezes na semana?</p>

            {/* Alterado para radio buttons, já que parece ser uma escolha única */}
            <label htmlFor="frequency-1">
              <input
                type="radio"
                id="frequency-1"
                name="desiredWeeklyFrequency"
                value="1"
                onChange={handleChange}
              />
              <span className="checkmark">1x na semana 🥱</span>
            </label>

            <label htmlFor="frequency-2">
              <input
                type="radio"
                id="frequency-2"
                name="desiredWeeklyFrequency"
                value="2"
                onChange={handleChange}
              />
              <span className="checkmark">2x na semana 🙂</span>
            </label>

            <label htmlFor="frequency-3">
              <input
                type="radio"
                id="frequency-3"
                name="desiredWeeklyFrequency"
                value="3"
                onChange={handleChange}
              />
              <span className="checkmark">3x na semana 😎</span>
            </label>

            <label htmlFor="frequency-4">
              <input
                type="radio"
                id="frequency-4"
                name="desiredWeeklyFrequency"
                value="4"
                onChange={handleChange}
              />
              <span className="checkmark">4x na semana 😜</span>
            </label>

            <label htmlFor="frequency-5">
              <input
                type="radio"
                id="frequency-5"
                name="desiredWeeklyFrequency"
                value="5"
                onChange={handleChange}
              />
              <span className="checkmark">5x na semana 🤨</span>
            </label>

            <label htmlFor="frequency-6">
              <input
                type="radio"
                id="frequency-6"
                name="desiredWeeklyFrequency"
                value="6"
                onChange={handleChange}
              />
              <span className="checkmark">6x na semana 🤯</span>
            </label>

            <label htmlFor="frequency-7">
              <input
                type="radio"
                id="frequency-7"
                name="desiredWeeklyFrequency"
                value="7"
                onChange={handleChange}
              />
              <span className="checkmark">Todos os dias da semana 🔥</span>
            </label>
          </div>

          <span className="buttons-goals">
            <button type="button" className="create-goals-button">
              Fechar
            </button>
            <button type="submit" className="create-goals-button">Salvar</button>
          </span>
        </form>
      </div>
    </nav>
  );
}
