
import { useState } from 'react';

type ConnectivityTarget = 'mock' | 'auth-health';

export const ConnectivityCheck = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkConnectivity = async (
    target: ConnectivityTarget,
  ): Promise<void> => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch(
        `/api/dev/connectivity/${target}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: unknown = await response.json();

      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid connectivity response');
      }

      if (!('status' in data)) {
        throw new Error('Missing status');
      }

      if (typeof data.status !== 'string') {
        throw new Error('Invalid status');
      }

      if (
        target === 'mock' &&
        (!('service' in data) ||
          typeof data.service !== 'string')
      ) {
        throw new Error('Invalid mock response');
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
      setResult(
        error instanceof Error
          ? error.message
          : 'Unknown error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Local Connectivity Check</h2>

      <button
        type="button"
        disabled={loading}
        onClick={() => {
          void checkConnectivity('mock');
        }}
      >
        Check Mock
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => {
          void checkConnectivity('auth-health');
        }}
      >
        Check Auth Health
      </button>

      <pre>{result}</pre>
    </section>
  );
};