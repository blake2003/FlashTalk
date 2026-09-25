import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>登入</Text>
      <Text style={styles.hint}>Auth API 實作於 Phase 1</Text>
      <Link href="/(auth)/register" style={styles.link}>
        建立帳號
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  hint: { marginTop: 8, color: '#64748B' },
  link: { marginTop: 24, color: '#0369A1', fontWeight: '600' },
});
