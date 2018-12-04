import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';

import Test from './test/test.component';
import actions from './actions';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Test} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions.testActions }, dispatch)
});

setConfig({ logLevel: 'debug' });

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hot(module)(App))
);
