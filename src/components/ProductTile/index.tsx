import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Container,
  Content,
  ProductImage,
  ProductInfo,
  ProductTitles,
  ProductName,
  ProductDescription,
  Line,
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

export type IProductData = {
  id: string;
  description: string;
  photoUrl: string;
  name: string;
};

type IProductTileProps = RectButtonProps & {
  data: IProductData;
};

const ProductTile: React.FC<IProductTileProps> = ({ data, ...rest }) => {
  return (
    <Container  {...rest}>
      <Content>
        <ProductImage source={{ uri: data.photoUrl }} />
        <ProductInfo>
          <ProductTitles>
            <ProductName>{data.name}</ProductName>
            <ProductDescription>{data.description}</ProductDescription>
          </ProductTitles>
          <MaterialIcons name="chevron-right" size={18} />
        </ProductInfo>
      </Content>
      <Line />
    </Container>
  );
};

export default ProductTile;
