import { useTheme } from "../Context/ThemeContext"

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
        >
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default ThemeToggle;
