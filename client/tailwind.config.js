/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans']
			},
			colors: {
				primary: '#E5FE74',
				secondary: '#74fe86',
				tertiary: '#1d400f',
				quaternary: '#A29EA3',
				quinary: '#141714',
				senary: '#000000'
			}
		}
	},
	plugins: []
};
