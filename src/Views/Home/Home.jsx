import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Formulario from "../../components/Formulario/Formulario";
import "./Home.css";
import { TarefaService } from "../../Services/TarefaServices";

function Home() {
  //State com a Lista de Tarefas
  const [tarefas, setTarefas] = useState([]);

  // buscar os dados na API => Read All => atualizar o nosso state => getAllTarefas()

  async function getAllTarefas() {
    // const response = await fetch("http://localhost:8000/tarefas"); //Link da API
    // const AllTarefas = await response.json(); //aki vai pegar os valores json do Link da API
    const AllTarefas = await TarefaService.getLista();
    setTarefas([...AllTarefas]); //aki ta pegando os valores json recebidos e colocando dentro de um array,e esse array é um parâmetro da função de alterar o valor do state tarefas
  }

  const [novaTarefa, setNovaTarefa] = useState({
    title: "",
    imagem: "",
    description: "",
    objective: "",
  });
  // const [TarefaValue, setTarefaValue]= useState()
  const HandleChangeCreate = (event) => {
    setNovaTarefa({ ...novaTarefa, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  console.log(novaTarefa);

  async function create(tarefa) {
    
    const novaTarefa = await TarefaService.create(tarefa);
    setTarefas([...tarefas,novaTarefa]);
  }

  const CreateTarefa = () => {
    create(novaTarefa);
    setNovaTarefa({
      title: "",
      imagem: "",
      description: "",
      objective: "",
    });
  };

  // PESQUISAR

  const [btnId, setBtnId] = useState("");
  const [tarefaEncontrada, setTarefaEncontrada] = useState();

  async function ProcurarTarefa(id) {
    // const response = await fetch(`http://localhost:8000/tarefas/${id}`);
    // const tarefa_encontrada = await response.json();
    const tarefa_encontrada = await TarefaService.getById(id);
    setTarefas([tarefa_encontrada]);
  }
  const pesquisarChange = (event) => {
    setBtnId(event.target.value);
  };
  const pesquisarBtn = (event) => {
    ProcurarTarefa(btnId);
  };
  // EDITAR

  const [tarefaAtualizada, setTarefaAtualizada] = useState({
    title: "",
    imagem: "",
    description: "",
    objective: "",
  });





  // DELETAR TAREFAS
  const [mostrarEditForm, setMostrarEditForm] = useState(false);
  const [tarefaDeletada, setTarefaDeletada] = useState({});
  const [tarefA, setTarefA] = useState({
    Tarefa_ID: "",
  });
  async function deleteTarefa(id) {
    const response = await fetch(`http://localhost:8000/tarefas/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const response_tarefa_deletada = await response.json();
    setTarefaDeletada(response_tarefa_deletada);
  }
  const QuandoClicarDeletar = (e) => {
    setMostrarEditForm(true);
    setTarefA({ Tarefa_ID: e.target.id });
  };
  const DeleteItem = () => {
    deleteTarefa(tarefA.Tarefa_ID);
    window.location.reload(true);
  };

  useEffect(() => {
    getAllTarefas();
  }, [tarefaDeletada]); // Ao passar apenas a função sem um valor no colchetes, ele renderizará a função passada no useEffect apenas na primeira renderização, se colocar algum valor dentro do colchetes, ele renderizará sempre que o valor entre colchetes for alterado.
  return (
    // Aki retorna entre chaves{} tudo q for javascript e passa um map para iterar sobre cada item da tarefa, e a key serve para gerar um id para cada uma de forma automática, e estou salvando o valor em uma tag para cada objeto da minha coleção da API.
    <>

      {/* criar tarefas */}
      <div className="Formularios">
        <div>
          <Formulario
            onChange={HandleChangeCreate}
            name="title"
            placeholder="Digite o Título da Tarefa"
            value={novaTarefa.title}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="imagem"
            placeholder="Digite o link da imagem da tarefa"
            value={novaTarefa.imagem}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="description"
            placeholder="Digite a Descrição da Tarefa"
            value={novaTarefa.description}
          />
          <Formulario
            onChange={HandleChangeCreate}
            name="objective"
            placeholder="Digite o objetivo da Tarefa"
            value={novaTarefa.objective}
          />

          <button onClick={CreateTarefa}>Cadastrar Tarefa</button>
        </div>

        <div>
          <Formulario
            name="title"
            placeholder="Digite o Título da Tarefa"
            onChange={pesquisarChange}
          />
          <button onClick={pesquisarBtn}>Pesquisar</button>
        </div>
      </div>
      <br />
      <br />
      <a href="http://localhost:3000/">
        <button>HOME</button>
      </a>

      {/* LISTA */}
      <div className="container-Details">
        {tarefas.map((tarefa) => (
          <div className="co-containerD" key={tarefa.id}>
            <div>
              <img
                className="Imagem-home"
                src={tarefa.imagem}
                alt="imagem tarefa"
              />
            </div>
            <div className="contentD">
              <h3>Titulo: </h3>
              <h4>{tarefa.title}</h4>
              <h4>Descrição: </h4>
              <p>{tarefa.description}</p>
              <h4>Objetivo Final:</h4>
              <span>{tarefa.objective}</span>
            </div>
            <div className="link-home">
              <button
                name="delete-button"
                onClick={() => deleteTarefa(tarefa.id)}
                id={tarefa.id}
              >
                {" "}
                <i class="bi bi-trash"></i>{" "}
              </button>
              <a>
                <Link
                  className="btn btn-primary"
                  //Aki ele pegou um botão do bootstrap e falou q ao clicar nele levará para a rotda detalhes que criamos no APP.js, mais especificamente ir no objeto desse ID
                  to={`/detalhes/${tarefa.id}`}
                >
                  Detalhes
                </Link>
              </a>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;
