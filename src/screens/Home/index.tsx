import React, { useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Container,
  Header,
  Greeating,
  GreeatingImage,
  GreeatingText,
  HomeTitle,
  Title,
  Quantity,
  ProductList,
  Footer,
} from './styles';

import happyImage from '../../assets/happy.png';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import Search from '../../components/Search';
import ProductTile, { IProductData } from '../../components/ProductTile';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { signOut, user } = useAuth();

  const [products, setProducts] = useState<IProductData[]>([]);
  const navigation = useNavigation();
  function searchPizza(value: string) {
    firestore()
      .collection('products')
      .orderBy('name_insensitive')
      .startAt(value.toLowerCase().trim())
      .endAt(`${value.toLowerCase().trim()}\uf8ff`)
      .get()
      .then((datas) => {
        const result = datas.docs.map((item) => {
          const { name, description, photoUrl } = item.data() as IProductData;
          return {
            id: item.id,
            name,
            description,
            photoUrl,
          };
        });

        setProducts(result);
      });
  }

  function handleOpen(id: string) {
    const page = user?.isAdmin ? 'Product' : 'Order';
    navigation.navigate(page, { id });
  }

  useFocusEffect(
    useCallback(() => {
      searchPizza('');
    }, [])
  );
  return (
    <Container>
      <Header>
        <Greeating>
          <GreeatingImage source={happyImage} />
          <GreeatingText>Ola, Garçom</GreeatingText>
        </Greeating>
        <IconButton
          iconName="logout"
          type="secondary"
          size={24}
          style={{ borderWidth: 0 }}
          onPress={signOut}
        />
      </Header>
      <Search onSearch={searchPizza} />
      <HomeTitle>
        <Title>Cardápio</Title>
        <Quantity>{products.length} pizzas</Quantity>
      </HomeTitle>
      <ProductList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductTile data={item} onPress={() => handleOpen(item.id)} />
        )}
      />
      {user?.isAdmin ? (
        <Footer>
          <Button
            title="Cadastrar Pizza"
            type="secondary"
            onPress={() => navigation.navigate('Product', {})}
          />
        </Footer>
      ) : null}
    </Container>
  );
};

export default Home;
