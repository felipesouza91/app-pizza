import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Logo,
  Title,
  Content,
  ForgotPasswordButton,
  ForgotPasswordButtonTitle,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImage from '../../assets/brand.png';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { forgotPassword, signIn, isLogging } = useAuth();
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Logo source={logoImage} />
        <Content>
          <Title>Login</Title>
          <Input
            placeholder="Email"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <ForgotPasswordButton onPress={() => forgotPassword(email)}>
            <ForgotPasswordButtonTitle>
              Esqueci minha senha
            </ForgotPasswordButtonTitle>
          </ForgotPasswordButton>
          <Button
            title="Entrar"
            type="secondary"
            onPress={() => signIn(email, password)}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signin;
