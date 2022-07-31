import React from 'react';
import { Container, Placeholder, PlaceholderText } from './styles';

type PhotoProps = {
  imageUrl: string | null;
};

const Photo: React.FC<PhotoProps> = ({ imageUrl }) => {
  return imageUrl ? (
    <Container source={{ uri: imageUrl }} />
  ) : (
    <Placeholder>
      <PlaceholderText>Nenhuma foto carregada</PlaceholderText>
    </Placeholder>
  );
};

export default Photo;
