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
      // fontFamily: {
      //   raleway: ["Raleway", "sans-serif"],
      //   montserrat: ["Montserrat", "sans-serif"],
      //   nunitoSans: ["Nunito Sans", "sans-serif"],
      // },
      colors: {
        // primary: '#3B82F6',
        // primaryHover: '#2563EB',
        // secondary: '#ed8f01',
        // secondaryHover: '#ffd912',
        // background: '#F3F4F6',
        // textPrimary: '#1F2937',
        // textSecondary: '#6B7280',
        // button: '#EF4444',
        // buttonHover: '#DC2626',
        // link: '#6366F1',
        // linkHover: '#4F46E5',
        // background2: '#0d0c0c',
        // successHover: '#16A34A',
        // Primary: '#0a7273',
        // Background1: '#e9e3d5',
        // Button: '#fda521',
        // ButtonHover: '#f4b85d',
        // Link: '#033043',
        // hover: '#cbd7f2',
        // hover2: '#f9d298'
        // text: '#212121',
        // hover: '#388E3C',
        Primary: '#212121',
        Button: '#003366',
        ButtonHover: '#66CCFF',
        SectionBg: '#F1F3FF',
        TextColor: '#2C3E50',
        H1Color: '#2C3E50',
        H2Color: '#3949AB',

FooterBg: '#4F52DC',

      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
