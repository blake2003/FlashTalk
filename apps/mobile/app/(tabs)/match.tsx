import { StyleSheet, Text, View } from 'react-native';

export default function MatchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>選擇配對方式</Text>
      <Text style={styles.hint}>興趣配對 / 全隨機 — Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700' },
  hint: { marginTop: 8, color: '#64748B' },
});
