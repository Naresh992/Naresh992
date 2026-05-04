import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/tokens';

export function SocialLoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue with</Text>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Google</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Apple</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{width:'100%',gap:spacing.md}, title:{...typography.heading2,color:colors.primaryText},
  button:{borderWidth:1,borderColor:colors.border,borderRadius:radius.md,padding:spacing.md,backgroundColor:colors.surface},
  buttonText:{...typography.title,color:colors.primaryText,textAlign:'center'}
});
