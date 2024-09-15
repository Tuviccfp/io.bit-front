/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User, Plus, List } from "@phosphor-icons/react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import MenuNavigationComponent from "../../shared/Menu";
import CreateGoalsComponent from "../CreateGoals";
import startsvg from "../../assets/lets-start-illustration.svg";
import "./style.css";

const userSchema = z.object({
  id: z.string().min(36),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const goalsSchema = z.object({
  id: z.string().min(36),
  title: z.string(),
  desiredWeeklyFrequency: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
type UserData = z.infer<typeof userSchema>;
type GoalsDataByUserID = z.infer<typeof goalsSchema>;

interface ApiResponse {
  userData: UserData[];
  goalsDataByUserID: GoalsDataByUserID[];
}
const menuItems = [
  { menuName: "Teste 1", key: 1 },
  { menuName: "Teste 2", key: 2 },
];

export default function ProfileComponent() {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserData[]>([]);
  const [goalsData, setGoalsData] = React.useState<GoalsDataByUserID[]>([]);

  const handleShowGoals = () => {
    navigate("/goals-page");
  };
  React.useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${url}/profile-acess`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
        });
        setUser(response.data.userData);
        setGoalsData(response.data.goalsDataByUserID);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAPI();
  }, [url]);

  if (!user.length && !goalsData.length) {
    return;
  }
  const { username } = user[0];
  return (
    <section>
      <MenuNavigationComponent
        itemsMenu={menuItems}
        logo={<User size={25} style={{ margin: 0, padding: 0 }} />}
        username={username}
      />
      <CreateGoalsComponent />
      <article className="article-welcome">
        <img src={startsvg} alt="Ilustração de começar" />
        <h2>Bem vindo, {username}!</h2>
        <p>
          Aqui você pode gerenciar suas metas, verificar progresso e visualizar
          seu histórico.
        </p>
        <span>
          <button type="button">
            <Plus size={22} />
            Cadastrar meta
          </button>
          <button onClick={handleShowGoals} type="button">
            <List size={22} />
            Listar metas
          </button>
        </span>
      </article>
    </section>
  );
}
