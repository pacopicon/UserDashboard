import React, { Component } from 'react';
import './test.css';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';

class Header extends Component {

  constructor(props) {
    super(props)

    this.renderCommunities = this.renderCommunities.bind(this)
  }

  renderCommunities(arr) {
    let items = arr.map( (item) => 
      <MenuItem className="white" key={item} onClick={this.props.navigateToCommunity}>
        { item }
      </MenuItem>
    )
    return (
      <Nav>
          <NavDropdown id="dropdown" eventKey={3} title="Communities" id="basic-nav-dropdown">
            { items }
          </NavDropdown>
        </Nav>
    )
  }

  render() {
    let 
      { communities, names } = this.props
    return (
      <Navbar id="Header" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="white">Relevant</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>  
          {
            communities
              ? this.renderCommunities(communities)
              : ''
          }
          <Typeahead
            labelKey="user"
            placeholder="Search a user..."
            onChange={(selected) => {
              this.props.handleSearchQuery(selected)
            }}
            options={names}
          /> 
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header