import React from "react";
import styled from "styled-components";
import TurnReveal, { Direction, Transition } from "../TurnReveal/TurnReveal";
import * as PropTypes from "prop-types";

// noinspection JSUnusedGlobalSymbols
export default class FollowReveal extends React.Component {
	static propTypes = {
		back: PropTypes.element
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
		return (
			<TurnRevealWrapper>
				{/*getBoundingClientRect is undefined on React components, so we need a plain DOM element here.*/}
				{/*Putting the eventHandlers on the TurnReveal component also doesn't work for some reason.*/}
				<div
					onMouseEnter={e => this.animateInfo(e, Transition.show)}
					onMouseLeave={e => this.animateInfo(e, Transition.hide)}
					ref={this.revealRef}
					className="turn-reveal-container"
				>
					<TurnReveal
						back={this.props.back}
						transition={this.state.infoTransition}
						direction={this.state.infoDirection}
					>
						{this.props.children}
					</TurnReveal>
				</div>
			</TurnRevealWrapper>
		);
	}
}

const TurnRevealWrapper = styled.div`
	display: flex;
	justify-content: center;

	.turn-reveal-container {
		width: fit-content;
	}
`;

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
