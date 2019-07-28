import React from "react";
import TurnReveal from "../TurnReveal/TurnReveal";
import * as PropTypes from "prop-types";
import Transition from "../Transition";
import Direction from "../Direction";

// noinspection JSUnusedGlobalSymbols
export default class FollowReveal extends React.Component {
  static propTypes = {
    /** The perspective distance in number of pixels. */
    perspective: PropTypes.number.isRequired,
    /** A class name to give give the animated element and the placeholder element used as reference of the dimensions of the animated element.
     * 	See the combining example in the `TurnReveal` docs. */
    className: PropTypes.string,
    /** The animated element. */
    children: PropTypes.node.isRequired
  };

  state = {
    infoTransition: Transition.hide,
    infoDirection: Direction.right
  };

  revealRef = React.createRef();

  animateInfo = (event, transition) => {
    event.preventDefault();
    this.setState({
      infoTransition: transition,
      infoDirection: getClosestEdge(event, this.revealRef.current)
    });
  };

  render() {
    const {
      state: { infoTransition, infoDirection },
      props: { perspective, className, children }
    } = this;

    let style = { position: "absolute" };
    if (!className) style = { ...style, ...TurnReveal.defaultLayout };

    return (
      <>
        <TurnReveal
          transition={infoTransition}
          direction={infoDirection}
          perspective={perspective}
          className={className}
        >
          {children}
        </TurnReveal>
        <div
          onMouseEnter={e => this.animateInfo(e, Transition.show)}
          onMouseLeave={e => this.animateInfo(e, Transition.hide)}
          ref={this.revealRef}
          style={style}
        />
      </>
    );
  }
}

const getClosestEdge = (event, element) => {
  const { width, height, top, left } = element.getBoundingClientRect(),
    l = event.pageX - (left + window.pageXOffset),
    t = event.pageY - (top + window.pageYOffset);

  const closestHorizontalEdge =
      t > 0.5 * height
        ? { edge: Direction.bottom, distance: height - t }
        : {
            edge: Direction.top,
            distance: t
          },
    closestVerticalEdge =
      l > 0.5 * width
        ? { edge: Direction.right, distance: width - l }
        : {
            edge: Direction.left,
            distance: l
          };

  return closestHorizontalEdge.distance < closestVerticalEdge.distance
    ? closestHorizontalEdge.edge
    : closestVerticalEdge.edge;
};
