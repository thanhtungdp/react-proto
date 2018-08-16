import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LeftContainer from './LeftContainer.jsx';
import MainContainer from './MainContainer.jsx';
import RightContainer from './RightContainer.jsx';
import convertIdToObjs from '../utils/convertIdsToObjs.util';
import theme from '../components/theme';
import { loadInitData } from '../actions/components';

const mapStateToProps = store => ({
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
});

const mapDispatchToProps = { loadInitData };

class AppContainer extends Component {
  state = {
    width: 25,
    rightColumnOpen: true,
  }

  collapseColumn = () => {
    if (this.state.width === 25) {
      this.setState({
        width: 0,
        rightColumnOpen: false,
      });
    } else {
      this.setState({
        width: 25,
        rightColumnOpen: true,
      });
    }
  }

  componentDidMount() {
    this.props.loadInitData();
  }

  render() {
    const { components, totalComponents, focusComponent } = this.props;
    const { width, rightColumnOpen } = this.state;
    const updatedComponents = convertIdToObjs(components);

    return (
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <LeftContainer
            components={updatedComponents}
            totalComponents={totalComponents}
            focusComponent={focusComponent}
          />
          <MainContainer
            components={updatedComponents}
            collapseColumn={this.collapseColumn}
            width={width}
            rightColumnOpen={rightColumnOpen}
            totalComponents={totalComponents}
          />
          <RightContainer
            width={width}
            components={updatedComponents}
            rightColumnOpen={rightColumnOpen}
            focusComponent={focusComponent}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

AppContainer.propTypes = {
  components: PropTypes.array.isRequired,
  totalComponents: PropTypes.number.isRequired,
  focusComponent: PropTypes.object.isRequired,
  loadInitData: PropTypes.func.isRequired,
};
