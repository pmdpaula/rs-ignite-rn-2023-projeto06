import { IconProps } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

import { TouchableOpacityProps } from 'react-native';

import theme from '../../theme';
import { Container } from './styles';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type ButtonIconProps = TouchableOpacityProps & {
  icon: IconBoxProps;
};

export const ButtonIcon = ({ icon: Icon, ...rest }: ButtonIconProps) => {
  const { COLORS } = useTheme();

  return (
    <Container
      activityOpacity={0.7}
      {...rest}
    >
      <Icon
        size={24}
        color={COLORS.BRAND_MID}
      />
    </Container>
  );
};
