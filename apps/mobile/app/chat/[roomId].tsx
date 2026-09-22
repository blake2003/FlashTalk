import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>聊天室</Text>
      <Text style={styles.hint}>roomId: {roomId}</Text>
      <Text style={styles.hint}>Session #1 · 10 分鐘 · Phase 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700' },
  hint: { marginTop: 8, color: '#64748B' },
});
