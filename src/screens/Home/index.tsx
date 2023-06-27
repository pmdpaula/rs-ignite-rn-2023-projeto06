import { useNavigation } from '@react-navigation/native';

import { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import { CarStatus } from '../../components/CarStatus';
import { HistoricCard } from '../../components/HistoricCard';
import { HomeHeader } from '../../components/HomeHeader';
import { useQuery, useRealm } from '../../lib/realm';
import { Historic } from '../../lib/realm/schemas/Historic';
import { Container, Content } from './styles';

export const Home = () => {
  const [vehiclesInUse, setVehiclesInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehiclesInUse) {
      navigate('arrival', { id: vehiclesInUse?._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicles = historic.filtered("status = 'departure'")[0];
      setVehiclesInUse(vehicles);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao buscar veículo', 'Não foi possível buscar o veículo em uso.');
    }
  }

  function fetchHistoric() {
    const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

    console.log('🚀 ~ file: index.tsx:41 ~ fetchHistoric ~ response:', response);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.addListener('change', fetchVehicleInUse);

    return () => realm.removeListener('change', fetchVehicleInUse);
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehiclesInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <HistoricCard
          data={{ created: '20/04', licensePlate: 'XXX1234', isSync: false }}
        />
      </Content>
    </Container>
  );
};
