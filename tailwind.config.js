/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
        './src/layout/**/*.{js,jsx,ts,tsx}',
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/util/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
        "./node_modules/flowbite/**/*.js",
        './public/**/*.html'
    ],
    theme: {
        extend: {
            top: {
                '18': '7rem',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#ffffff',
                tree: '#283618',
                leaf: '#606c38',
                skin: '#dda15e',
                trunk: '#bc6c25'
            }
        },
        fontFamily: {
            'body': [
                'Inter', 
                'ui-sans-serif', 
                'system-ui',
                // other fallback fonts
            ],
            'sans': [
                'Inter', 
                'ui-sans-serif', 
                'system-ui',
                'Graphik',
                'sans-serif'
                // other fallback fonts
            ]
        },
    },
    darkMode: 'class',
    plugins: [
        require('flowbite/plugin')
    ],
}

