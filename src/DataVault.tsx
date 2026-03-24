import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { IExecDataProtector } from '@iexec/dataprotector';

export function DataVault() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const [dataName, setDataName] = useState('');
  const [dataValue, setDataValue] = useState('');
  const [price, setPrice] = useState('0');
  const [protectedDataAddress, setProtectedDataAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProtectData = async () => {
    if (!walletClient) {
      setError('Wallet client not available');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // DataProtector 2.0.0-beta might use a different instantiation or provider handling.
      // Based on docs, it might expect a web3Provider (like window.ethereum or a viem wallet client with specific transport).
      const dataProtector = new IExecDataProtector(window.ethereum);
      const { address } = await dataProtector.core.protectData({
        name: dataName,
        data: { value: dataValue },
      });
      setProtectedDataAddress(address);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to protect data');
    } finally {
      setLoading(false);
    }
  };

  const handleMonetizeData = async () => {
    if (!protectedDataAddress) return;
    setLoading(true);
    setError(null);
    try {
      const dataProtector = new IExecDataProtector(window.ethereum);
      await dataProtector.core.grantAccess({
        protectedData: protectedDataAddress as `0x${string}`,
        authorizedApp: '0x0000000000000000000000000000000000000000', // Any app
        authorizedUser: '0x0000000000000000000000000000000000000000', // Any user
        pricePerAccess: parseInt(price),
        numberOfAccess: 1000,
      });
      alert('Data listed for monetization!');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to monetize data');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h1>DataVault</h1>
        <p>Protect and monetize your personal data on iExec.</p>
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>DataVault</h2>
      <p>Connected: <code>{address}</code></p>
      <button onClick={() => disconnect()} style={{ backgroundColor: '#ff4444' }}>Disconnect</button>

      <hr />

      {!protectedDataAddress ? (
        <div>
          <h3>Protect New Data</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Data Name (e.g., My Email)"
              value={dataName}
              onChange={(e) => setDataName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
            />
            <textarea
              placeholder="Data Value (e.g., example@mail.com)"
              value={dataValue}
              onChange={(e) => setDataValue(e.target.value)}
              style={{ width: '100%', padding: '8px', minHeight: '60px' }}
            />
          </div>
          <button onClick={handleProtectData} disabled={loading || !dataName || !dataValue}>
            {loading ? 'Protecting...' : 'Protect Data'}
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#4CAF50' }}>✓ Data Protected!</h3>
          <p>Protected Data Address:<br /><code>{protectedDataAddress}</code></p>
          <hr />
          <h3>Monetize Your Data</h3>
          <p>Set a price for anyone to use your data in an iApp.</p>
          <div style={{ marginBottom: '10px' }}>
            <label>Price per access (nRLC): </label>
            <input
              type="number"
              placeholder="Price per access (nRLC)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ padding: '8px' }}
            />
          </div>
          <button onClick={handleMonetizeData} disabled={loading}>
            {loading ? 'Listing...' : 'List for Monetization'}
          </button>
          <br /><br />
          <button onClick={() => setProtectedDataAddress(null)} style={{ backgroundColor: '#666' }}>Protect More Data</button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px', border: '1px solid #fcc' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
