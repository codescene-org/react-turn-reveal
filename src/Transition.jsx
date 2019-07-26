const Transition = { hide: "hide", show: "show" };
Object.freeze(Transition);
export default Transition;

export const oppositeTransition = transition =>
	transition === Transition.hide ? Transition.show : Transition.hide;
