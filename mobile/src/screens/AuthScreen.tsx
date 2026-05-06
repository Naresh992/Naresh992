import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onDone: () => void; onBack: () => void };

export function AuthScreen({ onDone, onBack }: Props) {
  const [showCode, setShowCode] = useState(false);

  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <View style={styles.content}>
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>SIGN IN</Text>
          <Text style={styles.title}>{showCode ? 'Enter your code' : 'Welcome back'}</Text>
          <Text style={styles.subtitle}>{showCode ? 'Use the code sent to your phone.' : 'Log in to access your scans, avatar, and try-ons.'}</Text>
        </View>
        {showCode ? (
          <View style={styles.codeRow}>
            {[0, 1, 2, 3].map((item) => <View key={item} style={styles.codeBox}><Text style={styles.codeText}>{item === 0 ? '4' : ''}</Text></View>)}
          </View>
        ) : (
          <Input label="Phone number" value="+1 555 018 2048" keyboardType="phone-pad" />
        )}
        <Button title={showCode ? 'Continue' : 'Send Code'} onPress={showCode ? onDone : () => setShowCode(true)} />
        <View style={styles.socialGroup}>
          <Button title="Continue with Google" variant="secondary" />
          <Button title="Continue with Apple" variant="secondary" />
        </View>
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
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  copy: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.muted,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  codeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  codeBox: {
    flex: 1,
    height: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    ...typography.heading,
    color: colors.text,
  },
  socialGroup: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
