import { extendTheme } from 'native-base';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', 
    useSystemColorMode: true, 
  },
  colors: {
    light: {
      background: {
        50: "#e6ffe6",   // Fondo verde claro
        100: "#b3ffb3",  // Fondo verde más oscuro
      },
      text: {
        50: "black",
      },
    },
    dark: {
      background: {
        900: "#1a3321", // Fondo verde oscuro
      },
      text: {
        50: "white",
      },
    },
    primary: {
      500: '#32a852',  // Verde principal
      600: '#2d9449',  // Verde un poco más oscuro
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary', // Aplica el color primario (verde) a los botones
      },
    },
    Input: {
      defaultProps: {
        variant: 'underlined',
      },
    },
  },
});

export default theme;
