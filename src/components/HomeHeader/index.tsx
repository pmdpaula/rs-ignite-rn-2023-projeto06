import { Power } from 'phosphor-react-native';

import { TouchableOpacity } from 'react-native';

import theme from '../../theme';
import { Container, Greeting, Message, Name, Picture } from './styles';

export function HomeHeader() {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/pmdpaula.png' }}
        placeholder="L184i9ofbHof00ayjsay~qj[fQj["
      />

      <Greeting>
        <Message>Olá</Message>

        <Name>Pedro</Name>
      </Greeting>

      <TouchableOpacity onPress={() => {}}>
        <Power
          size={32}
          color={theme.COLORS.GRAY_400}
        />
      </TouchableOpacity>
    </Container>
  );
}
