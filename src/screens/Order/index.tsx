import React, { useEffect, useState, useMemo } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  Header,
  Image,
  Form,
  Title,
  SelectionSection,
  SelectionSectionRow,
  InputSection,
  InputGroup,
  Label,
  Total,
  ConfirmationButtonContainer,
  ConfirmationButton,
} from './styles';

import IconButton from './../../components/IconButton';
import Input from './../../components/Input';
import SelectButton from '../../components/SelectButton';
import { OrderNavigationProps } from '../../@types/navigation';
import { useAuth } from '../../hooks/auth';

type IProduct = {
  name: string;
  description: string;
  priceP: string;
  priceM: string;
  priceG: string;
  photoUrl: string;
};

const Order: React.FC = () => {
  const { user } = useAuth();
  const [size, setSize] = useState<'P' | 'M' | 'G'>();
  const [table, setTable] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const { params } = useRoute();

  const [product, setProduct] = useState({} as IProduct);
  const { id } = params as OrderNavigationProps;
  useEffect(() => {
    firestore()
      .collection('products')
      .doc(id)
      .get()
      .then((data) => {
        const produtData = data.data() as IProduct;
        setProduct(produtData);
      });
  }, []);

  function productPrice(size: 'P' | 'M' | 'G' | undefined) {
    let price = 0;
    switch (size) {
      case 'P':
        price = Number.parseInt(product.priceP);
        break;
      case 'M':
        price = Number.parseInt(product.priceM);
        break;
      case 'G':
        price = Number.parseInt(product.priceG);
        break;
      default:
        break;
    }
    return price;
  }

  useMemo(() => {
    let total = 0;
    const price = productPrice(size);
    total = price * quantity;
    setTotal(total);
  }, [quantity, size]);

  const handleSubmit = () => {
    firestore()
      .collection('orders')
      .add({
        userId: user?.id,
        productId: id,
        productSize: size,
        productPrice: productPrice(size),
        quantity,
        table,
        status: 0,
      })
      .then(() => {
        Alert.alert('Sucesso', 'Pedido realizado com sucesso');
        navigation.navigate('Home');
      })
      .catch(() => Alert.alert('Erro', 'Erro ao realizar o pedido'));
  };
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView>
        <Header>
          <IconButton
            iconName="chevron-left"
            type="secondary"
            style={{ marginBottom: 108 }}
            onPress={navigation.goBack}
          />
        </Header>
        <Image
          source={{
            uri: product.photoUrl,
          }}
        />

        <Form>
          <Title>{product.name}</Title>
          <SelectionSection>
            <Label>Selecione um tamanho</Label>
            <SelectionSectionRow>
              <SelectButton
                title="Pequena"
                onPress={() => setSize('P')}
                isChecked={size == 'P'}
              />
              <SelectButton
                title="Media"
                style={{ marginHorizontal: 8 }}
                onPress={() => setSize('M')}
                isChecked={size == 'M'}
              />
              <SelectButton
                title="Grander"
                onPress={() => setSize('G')}
                isChecked={size == 'G'}
              />
            </SelectionSectionRow>
          </SelectionSection>
          <InputSection>
            <InputGroup style={{ marginRight: 15 }}>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setTable(Number.parseInt(value))}
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number.parseInt(value))}
              />
            </InputGroup>
          </InputSection>
          <Total>Total: R$ {total.toFixed(2)}</Total>
          <ConfirmationButtonContainer>
            <ConfirmationButton
              title="Confirmar pedido"
              onPress={handleSubmit}
            />
          </ConfirmationButtonContainer>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Order;
