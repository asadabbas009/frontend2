/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6c3baa',
        'custom-blue': '#0066ae',
        'custom-lilac': '#ccc2e8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #6c3baa, #0066ae, #ccc2e8)',
      },
    },
  },
  plugins: [],
}

