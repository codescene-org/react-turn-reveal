// Adapted from https://codepen.io/noeldelgado/pen/pGwFx

import React from "react";
import styled, { css, keyframes } from "styled-components";
import * as PropTypes from "prop-types";
import Transition from "../Transition";
import Direction from "../Direction";

// noinspection JSUnusedGlobalSymbols
export default class TurnReveal extends React.Component {
	element = React.createRef();

	static defaultLayout = { width: "100%", height: "100%" };

	render() {
		// on the first render, this.element.current is still null, so we need these default values
		const hideAngles = {
			horizontal: "0",
			vertical: "0"
		};

		if (this.element.current) {
			const element = this.element.current;
			const rect = element.getBoundingClientRect();
			const { width, height } = rect;

			// recalculate the angles the element has to turn to disappear
			hideAngles.horizontal =
				getOutAngle(width, this.props.perspective) + "rad";
			hideAngles.vertical = getOutAngle(height, this.props.perspective) + "rad";
		}

		let style = { position: "absolute" };
		if (!this.props.className)
			style = { ...style, ...TurnReveal.defaultLayout };

		return (
			<>
				<div
					ref={this.element}
					className={this.props.className}
					style={style}
				/>
				<Animated
					transition={this.props.transition}
					direction={this.props.direction}
					hideAngles={hideAngles}
					className={this.props.className}
					style={style}
				>
					{this.props.children}
				</Animated>
			</>
		);
	}
}

TurnReveal.propTypes = {
	/** The transition to run. Options are defined in src/Transition. */
	transition: PropTypes.oneOf(Object.keys(Transition)).isRequired,
	/** The direction in which to run the transition. Options are defined in src/Direction. */
	direction: PropTypes.oneOf(Object.keys(Direction)).isRequired,
	/** The perspective distance in number of pixels. */
	perspective: PropTypes.number.isRequired,
	/** A class name to give give the animated element and the placeholder element used as reference of the dimensions of the animated element.
	 * 	See the combining example below. */
	className: PropTypes.string,
	/** The animated element. */
	children: PropTypes.node.isRequired
};

const Animated = styled.div`
	${props => animationProperties(props)}
`;

const directionTransforms = {
	right: { x: "100%", y: "0%" },
	top: { x: "50%", y: "0%" },
	left: { x: "0%", y: "0%" },
	bottom: { x: "50%", y: "100%" }
};

const getOutAngle = (size, perspective) => {
	return Math.atan2(size / 2, perspective) + 0.5 * Math.PI;
};

const animationProperties = props => {
	const directionTransform = directionTransforms[props.direction];
	return css`
		transform-origin: ${directionTransform.x} ${directionTransform.y};
		animation: ${turnAnimation(props)} 300ms ease 0ms 1 forwards;
	`;
};

const turnAnimation = ({
	transition,
	direction,
	hideAngles: { vertical, horizontal }
}) => {
	const horizontalVector = [
		0,
		direction === Direction.right ? -1 : 1,
		0,
		horizontal
	];
	const verticalVector = [direction === Direction.top ? -1 : 1, 0, 0, vertical];
	const hiddenVector =
		direction === Direction.right || direction === Direction.left
			? horizontalVector
			: verticalVector;
	const visibleVector = [0, 0, 0, 0];

	const { fromVector, toVector, fromVisibility, toVisibility } =
		transition === Transition.hide
			? {
					fromVector: visibleVector,
					toVector: hiddenVector,
					fromVisibility: "visible",
					toVisibility: "hidden"
			  }
			: {
					fromVector: hiddenVector,
					toVector: visibleVector,
					fromVisibility: "hidden",
					toVisibility: "visible"
			  };

	const toTransformString = vector => `transform: rotate3d(${vector.join()})`;

	return keyframes`
    from {
      visibility: ${fromVisibility};
      ${toTransformString(fromVector)};
    }
    to {
      visibility: ${toVisibility};
      ${toTransformString(toVector)};
    }
  `;
};
