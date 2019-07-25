import styled from "styled-components";
import transpose from "object-transpose";
import {
	Direction,
	Transition,
	oppositeTransition
} from "src/TurnReveal/TurnReveal";
import React from "react";
import Placeholder from "docs/placeholder.png";
import { Playground } from "docz";

export const Front = styled.div`
	height: 100%;
	width: 100%;
	background: #1fb6ff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

export const Image = styled.img`
	width: 100%;
	max-width: 400px;
	height: auto;
	vertical-align: middle; // Fixes small spacing on the bottom
`;

export const PlaceHolderImage = (
	<Image src={Placeholder} alt="Placeholder" width="40%" />
);

const Container = styled.div`
	display: grid;
	grid-template-areas:
		". top ."
		"left reveal right"
		". bottom .";
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
				onClick={() =>
					updateReveal(oppositeTransition(transition), Direction[direction])
				}
			>
				{text}
			</button>
		))}
		{children}
	</Container>
);

export const Masonry = styled.div`
	display: grid;
	grid-gap: 20px;
	width: 500px;
	grid-template-areas:
		"a a b c"
		"a a b d"
		"e f f d"
		"g g g d";
`;

const transform = xs => xs.map(x => x * 115 + (x - 1) * 20); // scale and account for gaps

export const gridElementData = transpose({
	area: ["a", "b", "c", "d", "e", "f", "g"],
	width: transform([2, 1, 1, 1, 1, 2, 3]),
	height: transform([2, 2, 1, 3, 1, 1, 1])
});
