import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacityProps } from 'react-native';
import {
  Container,
  Photo,
  Title,
  Info,
  StatusContainer,
  Status,
} from './styles';
type Product = { photoUrl: string; name: string };

type Order = {
  id: string;
  productId: string;
  table: string;
  quantity: number;
  status: 'Entregue' | 'Preparando' | 'Pronto';
};

type OrderTileProps = TouchableOpacityProps & {
  data: Order;
};

const OrderTile: React.FC<OrderTileProps> = ({ data, ...rest }) => {
  const [product, setProduct] = useState({} as Product);
  const { quantity, status, table } = data;
  useEffect(() => {
    firestore()
      .collection('products')
      .doc(data.productId)
      .get()
      .then((doc) => {
        setProduct(doc.data() as Product);
      });
  }, []);
  return (
    <Container {...rest}>
      <Photo source={{ uri: product.photoUrl }} />
      <Title>{product.name}</Title>
      <Info>
        Mesa {table} . Qnt: {quantity}
      </Info>
      <StatusContainer status={status}>
        <Status status={status}>{status}</Status>
      </StatusContainer>
    </Container>
  );
};

export default OrderTile;
