/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        primary: '#3B82F6',
        // primaryHover: '#2563EB',
        // secondary: '#10B981',
        // secondaryHover: '#059669',
        background: '#F3F4F6',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        button: '#EF4444',
        buttonHover: '#DC2626',
        // link: '#6366F1',
        // linkHover: '#4F46E5',
        // success: '#22C55E',
        // successHover: '#16A34A',
        Primary: '#0a7273',
Background1: '#e9e3d5',
Button: '#fda521',
ButtonHover:'#f4b85d',
Link:'#033043',

        // text: '#212121',
        // hover: '#388E3C',
      
      },
    },
  },
  plugins: [],
};
