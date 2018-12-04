import * as types from '../types';
import { extractCommunity } from '../helpers'


const initialState = {
  names: []
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case types.TEST_TYPE:
      return {
        ...state,
        string: action.payload
      };
    case types.SET_DATA:
      let output = { ...state }
      
      for (let p in action) {
        output[p] = action[p]
      }
      return output
    case types.SET_NAME:
      return {
        ...state,
        names: action.names
      }

    default:
      return state;
  }
}
