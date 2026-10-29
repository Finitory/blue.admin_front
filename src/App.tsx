import { ConnectivityCheck } from "./components/ConnectivityCheck.tsx";

const localConnectivityEnabled =
  import.meta.env.VITE_LOCAL_CONNECTIVITY_ENABLED === 'true';

export const App = () => {
  return (
    <main>
      <h1>Blue Admin</h1>
      <p>Admin Front is running.</p>

      {localConnectivityEnabled && <ConnectivityCheck />}
    </main>
  );
};