import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import './test.css';
import { isObjEmpty, returnTopX, sortByProp } from '../helpers'

import Header from './Header'
import Community from './Community'
import User from './User'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      community: '',
      searchedUser: {},
      searchedInstance: [],
      searchCommunities: [],
      searchPagerankRaw: '',
      showCommunities: true,
      showSearchResult: false,
      topX: 10
    }

    this.navigateToCommunity = this.navigateToCommunity.bind(this)
    this.filterByCommunity = this.filterByCommunity.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.renderUsers = this.renderUsers.bind(this)
    this.aggregateInstances = this.aggregateInstances.bind(this)
    this.iterateOverDeets = this.iterateOverDeets.bind(this)
  }
  static propTypes = {
    actions: PropTypes.object,
    communities: PropTypes.array

  }

  componentDidMount() {
    this.props.actions.test('test');
    this.props.actions.getData()
  }

  componentWillReceiveProps(nextProps) {
    let 
      oldUsers = this.props.users,
      newUsers = nextProps.users

    if ((newUsers && (oldUsers != newUsers))) {
      this.props.actions.getData()
    }
  }

  navigateToCommunity(e) {
    e.preventDefault()
    this.setState({
      showCommunities: true,
      showSearchResult: false,
      searchedUser: {},
      searchedInstance: [],
      searchCommunities: [],
      searchPagerankRaw: '',
      community: e.target.text
    })
  }

  filterByCommunity(community, props) {
    let 
      chosen = {},
      usersNotChosen = {},
      us = /(\_users)/g

    for (let p in props) {
      if (p == `${community}_users` || p == `${community}_instances`) {
        chosen[p] = props[p]
      } else if (p.match(us)) {
        usersNotChosen[p] = props[p]
      }
    }
    return {
      chosen,
      usersNotChosen
    }
  }

  aggregateInstances(props) {
    let 
      output = {},
      communities = props.communities
    output['all_instances'] = []
    if (communities && communities.length>0) {
      for (let p in props) {
        for (let i=0; i<communities.length; i++) {
          let community = communities[i]
          if (p == `${community}_instances`) {
            output['all_instances'] = [...output['all_instances'], ...props[p] ]
          }
        }
      }
    }
    return output['all_instances']
  }

  renderUsers(usersObj, instances, topX) {
    let 
      sorted   = sortByProp(instances, 'pagerank', 'desc'),
      filtered = returnTopX(sorted, topX),
      users    = filtered.map( instance => {
      let {
        _id,
        pagerank,
        user
      }           = instance,
      userProf    = usersObj[user]
      
      return (
        <User
          key={_id}
          pagerank={pagerank}
          bio={userProf.bio}
          handle={userProf.handle}
          id={userProf.id}
          image={userProf.image}
          level={userProf.level}
          name={userProf.name}
          profile_name={userProf.profile_name}
          relevance={userProf.relevance}
          token_id={userProf.token_id}
          vetoPower={userProf.vetoPower}
          iterateOverDeets={this.iterateOverDeets}
          searchCommunities={this.state.searchCommunities}
          searchPagerankRaw={this.state.searchPagerankRaw}
          
        />
      )
    })

    return (
      <div>
        { users }
      </div>
    )
  }

  searchObjByName = (obj, objobj, name) => {
    let output = {}
    for (let p in obj) {
      if (name == p) {
        output[p] = obj[p]
      } 
    }
    for (let p in objobj) {
      let val = objobj[p]
      for (let p in val) {
        if (name == p) {
          output[p] = val[p]
        }
      }
    }
    
    return output
  }

  handleSearchQuery(name) {
    let 
      allInstances = this.aggregateInstances(this.props),
      res = this.filterByCommunity(this.state.community, this.props),
      usersByCommunity = res.chosen,
      usersNotChosen = res.usersNotChosen,
      searchCommunities = [],
      searchPagerankRaw = '',
      searchedInstances = [],
      searchedUser = {}

    allInstances.map( instance => {
      if (instance.user == name) {
        searchedInstances.push(instance)
        searchCommunities.push (instance.community)
        searchPagerankRaw = instance.pagerankRaw
      }
    })

    searchedUser = this.searchObjByName(usersByCommunity, usersNotChosen, name)

    this.setState({
      searchedInstance: [searchedInstances[0]],
      searchedUser,
      searchCommunities,
      searchPagerankRaw,
      showCommunities: false,
      showSearchResult: true
    })
  }

  iterateOverDeets(arr, label) {
    let str = ''
    arr.map( item => {
      str += `${item}, `
    })

    let newStr = str.slice(0, str.length-2)

    return (
      <div>
        {label}: { newStr }
      </div>
    )
  }

  render() {
    let 
      { communities, names } = this.props,
      { community, searchedInstance, searchedUser, showCommunities, showSearchResult } = this.state,
      res = this.filterByCommunity(community, this.props),
      usersByCommunity = res.chosen,
      chosenInstances = usersByCommunity[`${community}_instances`],
      chosenUsers = usersByCommunity[`${community}_users`]

    console.log('searchedInstance.length > 0 = ', searchedInstance.length > 0)
    console.log('!isObjEmpty(searchedUser) = ', !isObjEmpty(searchedUser))

    return (
      <div>
        {
          communities
            ? <Header
                communities={communities}
                navigateToCommunity={this.navigateToCommunity} 
                handleSearchQuery={this.handleSearchQuery}
                names={names}
              />
            : ''
        }
        {
          community && chosenInstances.length > 0 && !isObjEmpty(chosenUsers) && showCommunities
            ? <Community 
                community={community}
                renderUsers={this.renderUsers}
                topX={this.state.topX}
                instances={chosenInstances}
                users={chosenUsers}
              />
            : ''
        }
        {
          searchedInstance.length > 0 && !isObjEmpty(searchedUser) && showSearchResult 
            ? this.renderUsers(searchedUser, searchedInstance)
            : ''
        }
      </div>
    );
  }
}

const unpackReducerProps = (obj) => {
  let output = {}

  for (let p in obj) {
    output[p] = obj[p]
  }
  return output
}

const mapStateToProps = state => (
  unpackReducerProps(state.test)
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions.test }, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
