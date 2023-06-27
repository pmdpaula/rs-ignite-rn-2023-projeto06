import { useNavigation } from '@react-navigation/native';

import { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { useQuery } from '../../lib/realm';
import { Historic } from '../../lib/realm/schemas/Historic';
import { Container, Content } from './styles';

export const Home = () => {
  const [vehiclesInUse, setVehiclesInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    if (vehiclesInUse) {
      navigate('arrival', { id: vehiclesInUse?._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicle() {
    try {
      const vehicles = historic.filtered("status = 'departure'")[0];
      setVehiclesInUse(vehicles);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao buscar veículo', 'Não foi possível buscar o veículo em uso.');
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehiclesInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
};
