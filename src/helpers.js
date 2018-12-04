import { schema, normalize } from 'normalizr';

const processStrategy = (value, parent, key) => {   
    if (value.profile && value.profile.name && value.token && value.token._id) {
      switch (key) {
        case 'user':
          let 
            profile_name = value.profile.name, 
            token_id = value.token._id,
            level = parent.level
  
          delete value.profile
          delete value.token
          
          return { ...value, profile_name, token_id, level }
        default:
          return { ...value }
      }
    }
  }

const
  user     = new schema.Entity( 'users', {}, { processStrategy } ),
  userVals = new schema.Values(user),
  userList = new schema.Array(userVals)

export const normData = (data) => {
  let norm = normalize(data, userList)
  return norm
}

export const extractComm = (objArr) => {
  let comm = new Set()
  for (let i=0; i<objArr.length; i++) {
    let profile = objArr[i]
    comm.add(profile.community)
  }
  return Array.from(comm)
}

export const isObjEmpty = (obj) => {
  let output = true
  for (let prop in obj) {
    output = false
  }
  return output
}

export const returnTopX = (arr, x) => {
  let 
    topX = [],
    limit = !x || (arr.length < x) ? arr.length : x
  
  for (let i=0; i<limit; i++) {
    topX.push(arr[i])
  }
  return topX
}

export const sortByProp = (objArr, p, orderBy) => {
  const propFilter = (a,b) => {
    if (orderBy = 'desc') {
      return b[p] - a[p]
    } else {
      return a[p] - b[p]
    }
  }
  return objArr.sort(propFilter)
}

