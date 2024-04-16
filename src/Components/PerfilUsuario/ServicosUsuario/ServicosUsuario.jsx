import React, { useContext, useEffect, useState } from 'react'
import style from './ServicoUsuario.module.css'
import { jwtDecode } from 'jwt-decode';
import { GET_AUTH_USER, GET_INNER_ID } from '../../../Api/api';
import useFetch from '../../../Hooks/useFetch';
import { GlobalContext } from "../../../Hooks/GlobalContext";
import Loading from "../../Utils/Loading/Loading.jsx";
import Error from "../../Utils/Error/Error.jsx";
import Title from '../../Titles/Title.jsx';


const ServicosUsuario = () => {
    const { userAuth, setUserAuth } = useContext(GlobalContext);
    const [currentUser, setCurrentUser] = useState(null);
    const { request, loading, error } = useFetch();
    const [servicosUser, setServicoUser] = useState(null)

    useEffect(()=>{
        const token = window.localStorage.getItem("token");
        async function fetchValidaToken() {
            if(token){
                const { id, rule } = jwtDecode(token);
                const { url, options } = GET_AUTH_USER("usuarios", token, id);              
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setUserAuth({ token, usuario: json, status: true, rule });
                    setCurrentUser(json);
                   
                }
            }
        }
        fetchValidaToken();
    },[])
   
    useEffect(()=>{
        async function fetchValidaServicos() {
            if(userAuth.status){
                const {id} = userAuth.usuario
                const { url, options } = GET_INNER_ID("servico",'usuario', id);
                const { response, json, loading } = await request(url, options);
                if (response.ok) {
                    setServicoUser(json.Servicos)
                    console.log(servicosUser);
                }
            }
        }
        fetchValidaServicos();
    },[userAuth]) 

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if(currentUser && userAuth)

    return (
    <div>

        <Title text="Meus servicos cadastrados" fontSize="3" className='container'/>
        <section className={`container ${style.containerServico}`}>
            <ul>
                {}
                {servicosUser && (
                    servicosUser.length == 0 ?<h2 className={style.notServico}>Não existem Serviços cadastrados</h2>:
                    servicosUser.map((servico)=>(
                        <li key={servico.id} className={style.modalServico}>
                            <div>
                                <h3>Serviço</h3>
                                <h2>{servico.nome_negocio}</h2>
                            </div>
                            <div>
                                <h3>Situação</h3>
                                <h2>{servico.status?'Publicado':'Aguardando Analise'}</h2>
                            </div>
                            <div>
                                <h3>Opções</h3>
                                <button className={style.btnOption}>Visualizar</button>
                                <button className={style.btnOption}>Editar</button>
                                <button className={style.btnOption}>Excluir</button>
                            </div>
                            <div>
                                <h3>Descrição</h3>
                                <h2>{servico.descricao_servico}</h2>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </section>

      
    </div>
  )
}

export default ServicosUsuario
