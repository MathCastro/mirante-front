import React from "react";
import globalHook from 'use-global-hook';
import * as actions from "../actions";

const initialState = {
    login: {
        username: '',
        password: '',
        status: 'INITIAL'
    },
    dashboard: {
        tabs: [],
        currentTab: '',
        pageNo: 0,
        pageSize: 5,
        sortBy: '',
        filter: '',
        data: [],
    },
    token: '',
    expireAt: '',
    operator: {}
  };
  
  const useGlobal = globalHook(React, initialState, actions);
  
  export default useGlobal;