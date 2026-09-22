import { StyleSheet, Text, View } from 'react-native';

export default function ConnectionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connections</Text>
      <Text style={styles.hint}>GET /connections — Phase 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700' },
  hint: { marginTop: 8, color: '#64748B' },
});
