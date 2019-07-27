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
		let style = { position: "absolute" };
		if (!this.props.className)
			style = { ...style, ...TurnReveal.defaultLayout };

		return (
			<>
				<TurnReveal
					transition={this.state.infoTransition}
					direction={this.state.infoDirection}
					perspective={this.props.perspective}
					className={this.props.className}
				>
					{this.props.children}
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
	const { width, height, top, left } = element.getBoundingClientRect();
	const l = event.pageX - (left + window.pageXOffset);
	const t = event.pageY - (top + window.pageYOffset);

	const closestHorizontalEdge =
		t > 0.5 * height
			? { edge: Direction.bottom, distance: height - t }
			: {
					edge: Direction.top,
					distance: t
			  };

	const closestVerticalEdge =
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
