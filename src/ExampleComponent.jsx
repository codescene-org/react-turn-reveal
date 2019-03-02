import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ExampleComponent extends Component {
  render() {
    const { text } = this.props;

    return <>Example Component: {text}</>;
  }
}

ExampleComponent.propTypes = {
  text: PropTypes.string
};
