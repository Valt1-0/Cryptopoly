/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A", // Fond principal très sombre
        secondary: "#000000", // Noir profond pour les éléments
        accent: "#00B3A6", // Bleu cyan clair et futuriste
        "background-light": "#121212", // Noir profond pour les sections principales
        "background-dark": "#0D0D0D", // Fond ultra sombre pour créer un effet d'immersion
        "border-light": "#333333", // Bordures subtiles pour la séparation des sections
        "border-dark": "#444444", // Bordures pour les sections sombres
        info: "#00B3A6", // Bleu cyan pour les éléments informatifs
        success: "#5BFF71", // Vert vif pour les succès
        warning: "#FF6B6B", // Rouge clair pour les alertes
        error: "#FF4444", // Rouge vif pour les erreurs
      },
    },
    animation: {
      tilt: "tilt 10s infinite linear",
      blob: "blob 7s infinite",
    },
    keyframes: {
      tilt: {
        "0%, 50%, 100%": {
          transform: "rotate(0deg)",
        },
        "25%": {
          transform: "rotate(0.5deg)",
        },
        "75%": {
          transform: "rotate(-0.5deg)",
        },
      },
      blob: {
        "0%, 100%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        crypto: {
          primary: "#1A1A1A",
          secondary: "#000000",
          accent: "#00B3A6",
          "base-100": "#ffffff", // Fond noir ultra sombre
          "background-light": "#121212",
          "background-dark": "#0D0D0D",
          "border-light": "#333333",
          "border-dark": "#444444",
          info: "#00B3A6",
          success: "#5BFF71",
          warning: "#FF6B6B",
          error: "#FF4444",
        },
      },
    ],
  },
};
