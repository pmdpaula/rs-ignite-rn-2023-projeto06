import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';
import dayjs from 'dayjs';
import { CloudArrowUp } from 'phosphor-react-native';
import Toast from 'react-native-toast-message';

import { useEffect, useState } from 'react';

import { Alert, FlatList } from 'react-native';

import { CarStatus } from '../../components/CarStatus';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import { HomeHeader } from '../../components/HomeHeader';
import { TopMessage } from '../../components/TopMessage';
import {
  getLastAsyncTimestamp,
  saveLastAsyncTimestamp,
} from '../../libs/asyncStorage/syncStorage';
import { useQuery, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Container, Content, Label, Title } from './styles';

export const Home = () => {
  const [vehiclesInUse, setVehiclesInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const realm = useRealm();
  const user = useUser();

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

  async function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
      const lastSync = await getLastAsyncTimestamp();

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
          created: dayjs(item.created_at).format('[Saída em ] DD/MM/YYYY [às] HH:mm'),
        };
      });

      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.');
    }
  }

  function handleHistoricDetails(id: string) {
    return () => navigate('arrival', { id });
  }

  async function progressNotification(transferred: number, transferrable: number) {
    const percentage = Math.round((transferred / transferrable) * 100);

    if (percentage === 100) {
      await saveLastAsyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados',
      });
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`);
    }
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener('change', fetchVehicleInUse);

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, []);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) {
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    });
  }, [realm]);

  return (
    <Container>
      {percentageToSync && (
        <TopMessage
          title={percentageToSync}
          icon={CloudArrowUp}
        />
      )}
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehiclesInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => <Label>Nenhum registro de utilização</Label>}
        />
      </Content>
    </Container>
  );
};
