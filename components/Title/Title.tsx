import { COLORS } from '@/constans/ui';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const Title = ({ style, ...props }: TextProps) => {
  return <Text style={[styles.base, style]} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.HEADER_TEXT_COLOR,
    fontSize: 35,
    fontWeight: 'bold',
  },
});
