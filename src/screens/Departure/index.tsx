import { Key } from 'phosphor-react-native';

import { useRef, useState } from 'react';

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
import { licensePlateValidade } from '../../utils/licensePlateValidat';
import { Container, Content } from './styles';

export const Departure = () => {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState<string>('');

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const keyboardAvoidingViewBehaivor = Platform.OS === 'ios' ? 'position' : 'height';

  function handleDepartureRegister() {
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
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
