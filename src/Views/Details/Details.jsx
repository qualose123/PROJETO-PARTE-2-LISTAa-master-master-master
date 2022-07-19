import { useState,useEffect } from "react";
import {Link, useParams } from 'react-router-dom'
import './Details.css'
//state da tarefa
function Details(){
    const [tarefa,setTarefa] = useState({})
    
    //useParans herda o valor informado no seu pai que está dentro de path, como lá está "/detalhes/:id", ele receberá o id
    const params = useParams()
    const{id} = params
    console.log(id)

    //função assincrona que pega cada objeto da coleção por id
    async function getTarefaByID(){
        const response = await fetch(`http://localhost:8000/tarefas/${id}`)
        const tarefaById = await response.json()
        setTarefa({...tarefaById})
    }

    //aki o useEffect irá renderizar apenas ao 
    useEffect(()=>{
        getTarefaByID(id)
    },[])


    //aki ele retora os valores dos detalhes da coleção de objetos presentes na API
    return(
        <div className="container">
          
            <div>
                <img src={tarefa.imagem} className="Img-Details" alt="Tarefa Imagem" />
            </div>
            <div co-container>
            <h3>Tarefa: {tarefa.title}</h3>
            <p>Descrição: {tarefa.description}</p>
            <span>Objetivo: {tarefa.objective}</span>
            </div>
            <div className="link">
            {/* Abaixo está um Button que leva para a rota "/" que definimos no app.js q esta "/" é a rota Home */}
            <a>
            <Link className="btn btn-primary"
                to="/">
                Home
            </Link>
            </a>
            </div>
        </div>
    )
}

export default Details