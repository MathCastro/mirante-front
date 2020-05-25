import React from "react";
import globalHook from 'use-global-hook';
import * as actions from "../actions";

const initialState = {
    login: {
        username: '',
        password: '',
        status: 'INITIAL'
    },
    token: '',
    expireAt: '',
    operator: {}
  };
  
  const useGlobal = globalHook(React, initialState, actions);
  
  export default useGlobal;