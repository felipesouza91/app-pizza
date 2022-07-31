import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  Header,
  Title,
  BottomSeparator,
  RightSeparator,
} from './styles';

import OrderTile from '../../components/OrderTile';
import { useAuth } from '../../hooks/auth';

type Order = {
  id: string;
  productId: string;
  productPrice: string;
  productSize: string;
  quantity: number;
  table: number;
  userId: string;
  status: number;
};

const STATUS = ['Preparando', 'Pronto', 'Entregue'];

type OrderTileData = {
  id: string;
  productId: string;
  table: string;
  quantity: number;
  status: string;
};

const Orders: React.FC = () => {
  const [data, setData] = useState<OrderTileData[]>([]);
  const { user } = useAuth();

  function handleChangeStatus(id: string, status: string) {
    let newStatus = 0;
    switch (status) {
      case 'Preparando':
        newStatus = 1;
        break;
      case 'Pronto':
        newStatus = 2;
        break;
      default:
        newStatus = 2;
        break;
    }
    if (status !== 'Entregue') {
      firestore().collection('orders').doc(id).update({
        status: newStatus,
      });
    }
  }

  useEffect(() => {
    const subscriver = firestore()
      .collection('orders')
      .where('userId', '==', user!.id)
      .onSnapshot((datasDocs) => {
        const values = datasDocs.docs.map((item) => {
          const id = item.id;
          const { productId, quantity, table, status } = item.data() as Order;
          return {
            id,
            productId,
            quantity,
            table: table.toString(),
            status: STATUS[status],
          };
        });
        setData(values);
      });
    return () => subscriver();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>
      <FlatList
        ItemSeparatorComponent={({}) => <BottomSeparator />}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        horizontal={false}
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RightSeparator>
            <OrderTile
              data={item}
              onPress={() => handleChangeStatus(item.id, item.status)}
            />
          </RightSeparator>
        )}
      />
    </Container>
  );
};

export default Orders;
