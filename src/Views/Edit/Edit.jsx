import "./Edit.css";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import Formulario from "../../components/Formulario/Formulario";
import {useNavigate} from 'react-router-dom'

function Edit() {
const navigate = useNavigate()


  const params = useParams();
  const { id } = params;
  console.log(id);

  const [tarefa, setTarefa] = useState({});
  const [novaTarefa, setNovaTarefa] = useState({});
  async function getTarefaByID() {
    const response = await fetch(`http://localhost:8000/tarefas/${id}`);
    const tarefaById = await response.json();
    setTarefa({ ...tarefaById });
    setNovaTarefa(tarefa)
  }

  useEffect(() => {
    getTarefaByID(id);
  }, []);

  const HandleChangeCreate = (event) => {
    setTarefa({ ...tarefa, [event.target.name]: event.target.value });
  };

   const UpdateTarefa = async () => {
    await fetch(`http://localhost:8000/tarefas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(tarefa),
      })
      navigate('/') //manda para a rota home
    console.log(tarefa);
  };

  return (
    <>
      <div className="Formularios">
        <div>
          <Formulario
            onChange={HandleChangeCreate}
            name="title"
            placeholder="Digite o Título da Tarefa"
            value={tarefa.title}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="imagem"
            placeholder="Digite o link da imagem da tarefa"
            value={tarefa.imagem}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="description"
            placeholder="Digite a Descrição da Tarefa"
            value={tarefa.description}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="objective"
            placeholder="Digite o objetivo da Tarefa"
            value={tarefa.objective}
          />

          <button onClick={UpdateTarefa}>Atualizar</button>
        </div>
      </div>
    </>
  );
}
export default Edit;
