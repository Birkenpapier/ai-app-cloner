import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';

// The red add button — opens the add-task modal. Sits above the tab bar.
export function Fab() {
  return (
    <Pressable
      onPress={() => router.push('/add-task')}
      className="absolute bottom-4 right-4 h-14 w-14 items-center justify-center rounded-full bg-red"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      }}
      accessibilityLabel="Add task"
    >
      <Plus size={28} color="#ffffff" strokeWidth={2.5} />
    </Pressable>
  );
}
