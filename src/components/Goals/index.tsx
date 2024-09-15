import * as React from "react";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import { Plus } from "@phosphor-icons/react";
import iconOrbit from "../../../public/icon.svg";
import "./style.css";

const DatePickerStyle = styled(StaticDatePicker)({
  border: "1px solid",
});
export default function GoalsComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section>
        <article>
          <div className="model-first">
            <img src={iconOrbit} alt="icon-orbit" width={50} height={50} />
            <p>{"Espaço para data escolhida"}</p>
            <DatePicker className="date-picker-model" />
            <button type="button">
              <Plus /> Cadastrar meta
            </button>
          </div>
          <h4 style={{ color: "white" }}>Teste</h4>
        </article>
      </section>
    </LocalizationProvider>
  );
}
