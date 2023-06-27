import { useTheme } from 'styled-components/native';

import { forwardRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { Container, Input, Label } from './styles';

type TextAreaInputProps = TextInputProps & {
  label: string;
};

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme();

    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </Container>
    );
  },
);

export { TextAreaInput };
