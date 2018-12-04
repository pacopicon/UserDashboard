import * as types from '../types';
import { normData, extractComm, isObjEmpty } from '../helpers'

export function test(str) {
  return {
    type: types.TEST_TYPE,
    payload: str
  };
}

const setData = (normed, communities) => {
  let output = {}
  output.type = types.SET_DATA
  output.communities = communities

  for (let i=0; i<communities.length; i++) {
    let community = communities[i]
    output[`${community}_users`] = normed[community].entities.users
    output[`${community}_instances`] = normed[community].result
  }
  return output
}

const setNames = (data) => {
  let set = new Set()
  for (let i=0; i<data.length; i++) {
    let datum = data[i]
    set.add(datum.user.name)
  }
   
  return {
    type: types.SET_NAME,
    names: Array.from(set)
  }
}

const separateByCommunity = (communities, data) => {
  let output = {}
  for (let i=0; i<data.length; i++) {
    let datum = data[i]
    for (let j=0; j<communities.length; j++) {
      let community = communities[j]
      if (datum.community == community) {
        if (!output.hasOwnProperty(community)) {
          output[community] = []
        }
        output[community].push(datum)
      }
    }
  }
  return output
}

const normalizeByCommunity = (obj) => {
  let output = {}
  for (let p in obj) {
    let data = obj[p]
    output[p] = normData(data)
  }
  return output
} 

export function getData() {
  return async dispatch => {
    try {
      let 
        data = require('../data/reputationData.json'),
        communities = extractComm(data),
        res = separateByCommunity(communities, data),
        output = normalizeByCommunity(res)

      if (communities.length>0 && !isObjEmpty(output)) {
        dispatch(setData(output, communities))
        dispatch(setNames(data))
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}
