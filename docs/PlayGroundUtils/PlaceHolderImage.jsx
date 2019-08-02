import styled from "styled-components";
import Placeholder from "./placeholder.png";
import React from "react";

export const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  vertical-align: middle; // Fixes small spacing on the bottom
`;

const PlaceHolderImage = () => (
  <Image src={Placeholder} alt="Placeholder" width="40%" />
);

export default PlaceHolderImage;
