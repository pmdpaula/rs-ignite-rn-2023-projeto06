import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';
import { Key } from 'phosphor-react-native';
import { v4 as uuid } from 'uuid';

import { useEffect, useRef, useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { useRealm } from '../../lib/realm';
import { Historic } from '../../lib/realm/schemas/Historic';
import { licensePlateValidade } from '../../utils/licensePlateValidat';
import { Container, Content } from './styles';

export const Departure = () => {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [registering, setRegistering] = useState(false);

  const realm = useRealm();
  const user = useUser();
  const { goBack } = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const keyboardAvoidingViewBehaivor = Platform.OS === 'ios' ? 'position' : 'height';

  useEffect(() => {
    console.log('UUID gerado pelo pacote uuid ==>', uuid());
  }, []);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidade(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert('Placa inválida', 'A placa informada não é válida. XXX9Z99');
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert(
          'Finalizade inválida',
          'A finalizade da utilização do veículo não pode ser vazia.',
        );
      }

      setRegistering(true);

      // o write cria uma transação no banco de dados
      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        );
      });

      Alert.alert('Saída registrada', 'A saída do veículo foi registrada com sucesso.');
      goBack();
    } catch (error) {
      console.log(error);
      setRegistering(false);
      Alert.alert(
        'Erro ao registrar saída',
        'Ocorreu um erro ao registrar a saída do veículo. Tente novamente mais tarde.',
      );
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehaivor}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="RJ14567"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalizade"
              placeholder="Vou utilizar o veículo para..."
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={registering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
