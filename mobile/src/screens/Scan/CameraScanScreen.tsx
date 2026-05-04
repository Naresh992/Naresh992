import React from 'react';import { StyleSheet, Text, View } from 'react-native';import { colors, spacing, typography } from '../../theme/tokens';
export function CameraScanScreen(){return <View style={s.c}><Text style={s.t}>Body Scan</Text><Text style={s.d}>Camera + pose guide placeholder</Text></View>}
const s=StyleSheet.create({c:{width:'100%',gap:spacing.sm},t:{...typography.heading2,color:colors.primaryText},d:{...typography.body,color:colors.secondaryText}})
