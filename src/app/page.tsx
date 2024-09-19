import WagmiModal from "../providers/WagmiModal"; // Import the WagmiModal

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">web3provider.test</h1>
        <p className="text-lg">Your gateway to the decentralized world.</p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WagmiModal /> {/* Button to connect to wallets */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm">
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://docs.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://community.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Community
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://support.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Support
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://github.com/web3provider/test"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}