import { Text, View } from 'react-native';

import { person } from '@/lib/data';

// Colored-initials avatar. The original app uses profile photos; a raster
// screenshot doesn't contain those, so we re-create recognizable stand-ins.
export function Avatar({ id, size = 28 }: { id?: string; size?: number }) {
  const p = person(id);
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: p.color }}
    >
      <Text style={{ fontSize: size * 0.4, fontWeight: '700', color: '#ffffff' }}>{p.initials}</Text>
    </View>
  );
}
