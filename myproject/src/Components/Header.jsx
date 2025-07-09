import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b transition-colors
                       bg-white/90 border-gray-200
                       dark:bg-gray-800/90 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">ImageConverter</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-600
                     dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-600"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
