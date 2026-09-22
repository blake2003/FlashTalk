import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>FlashTalk</Text>
      <Text style={styles.subtitle}>聊得來才留下</Text>
      <Link href="/(auth)/login" style={styles.link}>
        開始
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  brand: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748B',
  },
  link: {
    marginTop: 32,
    fontSize: 16,
    fontWeight: '600',
    color: '#0369A1',
  },
});
