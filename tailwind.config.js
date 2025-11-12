export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
    theme: {
        extend: {
            colors: {
                light: {
                    bg: '#F6F8FB',
                    text: '#0B1220',
                    primary: '#0B5FFF',
                    secondary: '#FFDD00',
                    accent: '#E53935'
                },
                dark: {
                    bg: '#0B1220',
                    surface: '#151E35',
                    text: '#F6F8FB',
                    textMuted: '#C7D0E0',
                    primary: '#0B5FFF',
                    secondary: '#FFD43B',
                    accent: '#FF5C5C'
                }
            },
            fontFamily: {
                display: ['"Bebas Neue"', 'sans-serif'],
                body: ['Inter', 'sans-serif']
            }
        }
    },
    plugins: []
}