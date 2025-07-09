import './App.css'
import Header from './Components/Header';
import Uploadarea from './Components/Uploadarea';
import { ThemeProvider } from './Context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        <Uploadarea />
        
      </div>
    </ThemeProvider>
  );
}

export default App;
