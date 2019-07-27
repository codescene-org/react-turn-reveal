import styled from "styled-components";
import transpose from "object-transpose";
import React from "react";
import Placeholder from "docs/placeholder.png";
import Transition from "src/Transition";
import Direction from "src/Direction";

export const Front = styled.div`
	background: #1fb6ff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	width: 100%;
	height: 100%;
`;

export const Image = styled.img`
	width: 100%;
	max-width: 400px;
	height: auto;
	vertical-align: middle; // Fixes small spacing on the bottom
`;

export const PlaceHolderImage = () => (
	<Image src={Placeholder} alt="Placeholder" width="40%" />
);

const Container = styled.div`
	display: grid;
	grid-template-areas:
		". top ."
		"left reveal right"
		". bottom .";
`;

const RevealWrapper = styled.div`
	grid-area: reveal;
	place-self: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

let directions = Object.keys(Direction);
// Remove __filemeta property from docz, see https://github.com/pedronauck/docz/issues/875
directions = directions.filter(direction => direction !== "__filemeta");
const arrows = ["→", "↑", "←", "↓"];

export const ControlWrapper = ({ transition, updateReveal, children }) => (
	<Container>
		{transpose({
			direction: directions,
			place: ["center left", "end center", "center right", "start center"],
			text:
				transition === Transition.show
					? arrows
					: arrows.concat(arrows).slice(2, 6) // shift every element 2 positions counter-clockwise
		}).map(({ direction, place, text }) => (
			<button
				style={{
					gridArea: direction,
					placeSelf: place
				}}
				key={direction}
				onClick={() => updateReveal(Direction[direction])}
			>
				{text}
			</button>
		))}
		<RevealWrapper>{children}</RevealWrapper>
	</Container>
);

export const Grid = styled.div`
	display: grid;
	grid-gap: 2%;
	grid-template-columns: repeat(4, 0.25fr);
`;

export const CenteringFlexBox = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
