import React from 'react';
import TipCalculator from './components/TipCalculator';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
          {/* Tip Calculator */}
        </h1>
      </header>

      <main className="flex-grow">
        {/* This will contain the main content like the Tip Calculator and FAQ */}
        <div className="container mx-auto px-4">
          <TipCalculator />
        </div>
      </main>

      <footer className="bg-white py-4">
        {/* Footer content */}
        <p className="text-center text-sm text-gray-500">
          &copy; 2024 Tip Calculator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
