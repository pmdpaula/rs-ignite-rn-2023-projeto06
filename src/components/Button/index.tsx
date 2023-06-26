import { TouchableOpacityProps } from 'react-native';

import { Container, Loading, Title } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export const Button = ({ title, isLoading = false, ...rest }: ButtonProps) => {
  return (
    <Container
      activeOpacity={0.7}
      disable
      {...rest}
    >
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
};
