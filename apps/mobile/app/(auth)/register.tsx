import { StyleSheet, Text, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>註冊</Text>
      <Text style={styles.hint}>Email + Password → 驗證碼</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  hint: { marginTop: 8, color: '#64748B' },
});
