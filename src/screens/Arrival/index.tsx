import { useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';

import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { useObject } from '../../lib/realm';
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

  console.log('🚀 ~ file: index.tsx:24 ~ Arrival ~ historic:', historic);

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
        <ButtonIcon icon={X} />

        <Button title="Registrar chegada" />
      </Footer>
    </Container>
  );
};
