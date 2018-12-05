import React from 'react';

import './test.css';

const User = (props) => {
  return (
    <div className='userBlurb'>
      <img className='image' src={props.image}></img>
      <div className='userProfileInfo'>
        <div className='name'>name: {props.name}</div>
        <div className='bio'>bio: {props.bio}</div>
        {
          props.searchCommunities.length > 0
            ? props.iterateOverDeets(props.searchCommunities, 'communities')
            : ''
        }
        <div className='pagerank'>pagerank: {props.pagerank}</div>
        {
          props.searchPagerankRaw 
            ? <div className='searchPagerankRaw'>raw pagerank: {props.searchPagerankRaw}</div>
            : ''
        }
        <div className='level'>level: {props.level}</div>
      </div>
    </div>
  )
}
  
export default User