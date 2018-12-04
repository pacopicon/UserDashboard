import React, { Component } from 'react';
import './test.css';
import { isObjEmpty } from '../helpers'

const Community = (props) => {
  return (
    <div>
      <label id="Welcome">Welcome to the { props.community } community</label>
      { 
        !isObjEmpty(props.users) && props.instances.length > 0 && props.community
        ? props.renderUsers(props.users, props.instances, props.topX) 
        : ''
      }
    </div>
  )
}

export default Community