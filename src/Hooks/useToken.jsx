import  {jwtDecode}  from "jwt-decode";
import React, { useCallback, useContext, useState } from "react";
import { GET_AUTH_USER } from "../Api/api";
import useFetch from "./useFetch";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

const useToken = () => {
  const { request } = useFetch();
  const { setUserAuth } = useContext(GlobalContext);
  const navigate = useNavigate()
  const tokenValidate = useCallback(async (token) => {
    let tokenResponse;
    let tokenJson;
    try {
      const { id, rule } = jwtDecode(token);
      const { url, options } = GET_AUTH_USER("usuarios", token, id);
      const { response, json } = await request(url, options);
      tokenResponse = response;
      tokenJson = json;
      setUserAuth({ token, usuario: tokenJson, status: true, rule });
      if (tokenResponse.ok === false) throw new Error(json.mensagem);
    } catch (err) {
      tokenResponse = null;
      setUserAuth(null);
      navigate('/')
    } finally {
      return { tokenResponse, tokenJson };
    }
  }, []);

  return tokenValidate

};

export default useToken;
