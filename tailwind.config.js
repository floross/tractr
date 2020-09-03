module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        tractr: '#0000FF',
        'tractr-grey': '#F8F9FA',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/custom-forms')],

  future: {
    removeDeprecatedGapUtilities: true,
  },
};
