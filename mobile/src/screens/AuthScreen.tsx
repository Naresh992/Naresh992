import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { colors, spacing, typography } from '../styles/theme';

type Props = { onDone: () => void; onBack: () => void };

export function AuthScreen({ onDone, onBack }: Props) {
  const [codeSent, setCodeSent] = useState(false);
  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <View style={styles.content}>
        <Text style={styles.title}>{codeSent ? 'Enter 4 Digit Code' : 'Login to your account'}</Text>
        <Text style={styles.subtitle}>{codeSent ? 'We sent a verification code to +91 999-000-1234' : 'It’s great to see you again'}</Text>
        {codeSent ? (
          <View style={styles.otpRow}>{['1', '4', '2', '0'].map((digit) => <View style={styles.otpBox} key={digit}><Text style={styles.otpText}>{digit}</Text></View>)}</View>
        ) : (
          <Input label="Mobile Number" value="+ 91 999 - 000 - 1234" keyboardType="phone-pad" />
        )}
        <Button title={codeSent ? 'Continue' : 'Send Code'} onPress={codeSent ? onDone : () => setCodeSent(true)} />
        <View style={styles.divider}><View /><Text>Or</Text><View /></View>
        <Button title="Login with Google" variant="secondary" />
        <Button title="Login with Apple" variant="secondary" />
        <Text style={styles.join}>Don’t have an account? <Text style={styles.link}>Join</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.xl, justifyContent: 'center', gap: spacing.lg },
  title: { ...typography.hero, color: colors.text },
  subtitle: { ...typography.body, color: colors.muted, marginBottom: spacing.xl },
  otpRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  otpBox: { flex: 1, height: 64, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  otpText: { ...typography.h1, color: colors.text },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginVertical: spacing.md },
  join: { ...typography.body, color: colors.muted, textAlign: 'center', marginTop: spacing.md },
  link: { color: colors.text, textDecorationLine: 'underline' },
});
