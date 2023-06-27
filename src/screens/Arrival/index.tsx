import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';

import { Alert } from 'react-native';

import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { useObject, useRealm } from '../../lib/realm';
import { Historic } from '../../lib/realm/schemas/Historic';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';

type RouteParamsProps = {
  id: string;
};

export const Arrival = () => {
  // const [vehiclesInUse, setVehiclesInUse] = useState<Historic | null>(null);

  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();
  const { goBack } = useNavigation();

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ]);
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  function handleArrivelRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        );
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Chegada', 'Chegada registrada com sucesso.');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao registrar chegada',
        'Não foi possível registrar a chegada do veículo.',
      );
    }
  }

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do Veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      <Footer>
        <ButtonIcon
          icon={X}
          onPress={handleRemoveVehicleUsage}
        />

        <Button
          title="Registrar chegada"
          onPress={handleArrivelRegister}
        />
      </Footer>
    </Container>
  );
};
