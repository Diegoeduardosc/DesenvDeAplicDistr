import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  text: string
  onChangeText: React.Dispatch<React.SetStateAction<string>>
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  onChangeText,
  text,
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[{ color }, styles.input]}
      onChangeText={onChangeText}
      value={text}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
  },
});
