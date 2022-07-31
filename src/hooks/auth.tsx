import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_STORAGE_USER = '@app-pizza:users';

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
};

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha');
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (accounts) => {
        firestore()
          .collection('users')
          .doc(accounts.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;
            const userData = {
              id: profile.id,
              name,
              isAdmin,
            };
            await AsyncStorage.setItem(
              KEY_STORAGE_USER,
              JSON.stringify(userData)
            );
            setUser(userData);
          })
          .catch(() =>
            Alert.alert(
              'Login',
              'Não foi possivel buscar os dados de perfil do usuário'
            )
          );
      })
      .catch((error) => {
        console.log(error);
        const { code } = error;
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválida');
        } else {
          return Alert.alert('Login', 'Não foi possivel realizar o login');
        }
      })
      .finally(() => {
        setIsLogging(false);
      });
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(KEY_STORAGE_USER);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      Alert.alert('Recuperar senha', 'Email é obrigatorio');
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Recuperar senha',
          'Um E-mail enviado para recuperar sua senha'
        )
      )
      .catch((error) => {
        console.log(error);
        const { code } = error;
        if (code === 'auth/invalid-email ') {
          return Alert.alert('Recuperar senha', 'E-mail inválida');
        } else {
          return Alert.alert(
            'Recuperar senha',
            'Não foi possivel enviar o e-mail para redefinir a senha'
          );
        }
      });
  }

  async function loadUser() {
    setIsLogging(true);
    const result = await AsyncStorage.getItem(KEY_STORAGE_USER);
    if (result) {
      setUser(JSON.parse(result));
    }
    setIsLogging(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, forgotPassword, isLogging, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
