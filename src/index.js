import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import App from './App';

const root = createRoot(document.getElementById('root'));

const ThemeWrapper = () => {
	const [theme, setTheme] = React.useState(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark' ? 'dark' : 'light';
	});

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme); 
	};

	const themeMode = theme === 'light' ? lightTheme : darkTheme;

	return (
		<ThemeProvider theme={{ ...themeMode, toggleTheme }}>
			<GlobalStyle />
			<App />
		</ThemeProvider>
	);
};

root.render(
	<React.StrictMode>
		<ThemeWrapper />
	</React.StrictMode>
);
