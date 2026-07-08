import { Redirect } from 'expo-router';

// Discord opens on the Messages/DM home.
export default function Index() {
  return <Redirect href="/messages" />;
}
