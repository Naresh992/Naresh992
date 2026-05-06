import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onDone: () => void; onBack: () => void };

export function AuthScreen({ onDone, onBack }: Props) {
  const [codeSent, setCodeSent] = useState(false);

  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <View style={styles.content}>
        <View style={styles.copy}>
          <Text style={styles.kicker}>SECURE SIGN IN</Text>
          <Text style={styles.title}>{codeSent ? 'Verify your number' : 'Login to your account'}</Text>
          <Text style={styles.subtitle}>{codeSent ? 'Enter the code sent to your mobile number.' : 'Authenticate before scanning, trying on, or purchasing.'}</Text>
        </View>
        {codeSent ? (
          <View style={styles.otpRow}>
            {['', '', '', ''].map((_, index) => <View key={index} style={styles.otpBox}><Text style={styles.otpText}>{index === 0 ? '4' : ''}</Text></View>)}
          </View>
        ) : (
          <Input label="Mobile number" value="+1 555 018 2048" keyboardType="phone-pad" />
        )}
        <Button title={codeSent ? 'Continue' : 'Send Code'} onPress={codeSent ? onDone : () => setCodeSent(true)} />
        <View style={styles.divider}><View style={styles.rule} /><Text style={styles.dividerText}>OR</Text><View style={styles.rule} /></View>
        <Button title="Continue with Google" variant="secondary" />
        <Button title="Continue with Apple" variant="secondary" />
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.join}>Don’t have an account? <Text style={styles.link}>Join Raritone</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  copy: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  kicker: {
    ...typography.micro,
    color: colors.muted,
  },
  title: {
    ...typography.hero,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  otpBox: {
    flex: 1,
    height: 64,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    ...typography.h1,
    color: colors.text,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.sm,
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.micro,
    color: colors.subtle,
  },
  join: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  link: {
    color: colors.text,
    fontWeight: '800',
  },
});
