import { View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

import { tokens, type NodeColor } from '@/lib/tokens';

// A stylized mind-map thumbnail for the Recent grid. The real thumbnails are
// rendered previews of each map; a raster screenshot can't recover those, so we
// approximate the look — a central node with a few colored branches.
const BRANCHES: { y: number; color: NodeColor; w: number }[] = [
  { y: 20, color: 'blue', w: 46 },
  { y: 45, color: 'orange', w: 54 },
  { y: 70, color: 'red', w: 40 },
];

export function MiniMap({ accent }: { accent: NodeColor }) {
  const c = tokens.nodeColors;
  return (
    <View className="h-[92px] w-full items-center justify-center overflow-hidden rounded-t-card bg-canvas">
      <Svg width="100%" height="92" viewBox="0 0 160 92">
        {/* connectors */}
        {BRANCHES.map((b, i) => (
          <Line key={`l${i}`} x1={54} y1={46} x2={92} y2={b.y} stroke={c[b.color]} strokeWidth={1.5} opacity={0.5} />
        ))}
        {/* central idea */}
        <Rect x={20} y={38} width={40} height={16} rx={5} fill={c[accent]} />
        {/* branches */}
        {BRANCHES.map((b, i) => (
          <Rect key={`r${i}`} x={92} y={b.y - 6} width={b.w} height={12} rx={4} fill={c[b.color]} opacity={0.9} />
        ))}
      </Svg>
    </View>
  );
}
