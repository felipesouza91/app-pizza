import React, { useEffect, useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ProductNavigationProps } from '../../@types/navigation';
import {
  Container,
  Header,
  HeaderTitle,
  Content,
  PhotoSection,
  FormField,
  FormLabel,
  TextArea,
  FormFieldHeader,
  FormFieldHeaderTitle,
} from './styles';

import TextButton from '../../components/TextButton';
import IconButton from '../../components/IconButton';
import Photo from '../../components/Photo';
import Button from '../../components/Button';
import InputPrice from '../../components/InputPrice/index';
import Input from '../../components/Input';
import { useNavigation, useRoute } from '@react-navigation/native';

type IProduct = {
  name: string;
  description: string;
  priceP: string;
  priceM: string;
  priceG: string;
  photoUrl: string;
};

type ImageData = {
  uri: string;
  type: string | undefined;
};

const Product: React.FC = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { id } = router.params as ProductNavigationProps;
  const theme = useTheme();
  const [image, setImage] = useState<ImageData>({} as ImageData);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceP, setPriceP] = useState('');
  const [priceM, setPriceM] = useState('');
  const [priceG, setPriceG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza');
    }
    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe o descrição da pizza');
    }
    if (!priceG.trim() || !priceM.trim() || !priceP.trim()) {
      return Alert.alert('Cadastro', 'Informe o valor da pizza');
    }
    try {
      setIsLoading(true);
      const filename = new Date().getTime();
      const reference = storage().ref(`/pizzas/${filename}.png`);
      await reference.putFile(image.uri);
      const photoUrl = await reference.getDownloadURL();
      firestore()
        .collection('products')
        .add({
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          photoUrl,
          priceP,
          priceM,
          priceG,
        })
        .then(() => {
          Alert.alert('Cadastro', 'Produto foi realizado com sucesso');
          navigation.navigate('Home');
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    storage()
      .refFromURL(image.uri)
      .delete()
      .then(() => {
        firestore()
          .collection('products')
          .doc(id)
          .delete()
          .then(() => {
            Alert.alert('Excluir', 'Pizza foi excluida!');
            navigation.navigate('Home');
          })
          .catch(() => Alert.alert('Error', 'Erro ao excluir'));
      })
      .catch(() => Alert.alert('Error', 'Erro ao excluir'));
  };

  const pickImage = async () => {
    const { status: statusCamera } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: statusLibrery } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (statusCamera !== 'granted' && statusLibrery !== 'granted') {
      Alert.alert('Infor', 'Permita o acesso para enviar os arquivos');
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage({
        type: result.type,
        uri: result.uri,
      });
    }
  };

  useEffect(() => {
    if (id) {
      firestore()
        .collection('products')
        .doc(id)
        .get()
        .then((pizza) => {
          const { description, name, photoUrl, priceG, priceM, priceP } =
            pizza.data() as IProduct;
          setImage({
            uri: photoUrl,
            type: undefined,
          });
          setName(name);
          setDescription(description);
          setPriceG(priceG);
          setPriceM(priceM);
          setPriceP(priceP);
        });
    }
  }, []);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <IconButton
          iconName="chevron-left"
          type="secondary"
          onPress={navigation.goBack}
        />
        <HeaderTitle>Cadastrar</HeaderTitle>
        {id ? (
          <TextButton title="Deletar" onPress={handleDelete} />
        ) : (
          <View style={{ width: 20 }} />
        )}
      </Header>
      <Content>
        <PhotoSection>
          <Photo imageUrl={image.uri} />
          {!id && (
            <View style={{ height: 60 }}>
              <Button title="Carregar" onPress={pickImage} />
            </View>
          )}
        </PhotoSection>
        <FormField>
          <FormLabel>Nome</FormLabel>
          <Input onChangeText={setName} value={name} />
        </FormField>
        <FormField>
          <FormFieldHeader>
            <FormLabel>Descrição</FormLabel>
            <FormFieldHeaderTitle>Max 60 caracteres</FormFieldHeaderTitle>
          </FormFieldHeader>
          <TextArea
            maxLength={60}
            onChangeText={setDescription}
            value={description}
          />
        </FormField>
        <FormField>
          <FormLabel>Tamanhos e preços</FormLabel>
          <InputPrice size="P" onChangeText={setPriceP} value={priceP} />
          <InputPrice size="M" onChangeText={setPriceM} value={priceM} />
          <InputPrice size="G" onChangeText={setPriceG} value={priceG} />
        </FormField>
        {!id && (
          <Button
            title="Cadastrar pizza"
            type="secondary"
            isLoading={isLoading}
            style={{ backgroundColor: theme.COLORS.SUCCESS_900, marginTop: 32 }}
            onPress={handleAdd}
          />
        )}
      </Content>
    </Container>
  );
};

export default Product;
