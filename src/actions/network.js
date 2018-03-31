import {Client} from "../services/api";

export const SET_WITNESSES = 'SET_WITNESSES';
export const SET_NODES = 'SET_NODES';

export const setWitnesses = (witnesses = []) => ({
  type: SET_WITNESSES,
  witnesses,
});

export const setNodes = (nodes = []) => ({
  type: SET_NODES,
  nodes,
});

export const loadWitnesses = () => async (dispatch, getState) => {
  dispatch(setWitnesses(await Client.getWitnesses()));
};


export const loadNodes = () => async (dispatch, getState) => {
  let nodes = await Client.getNodes();
  dispatch(setNodes(nodes.citys));
};
