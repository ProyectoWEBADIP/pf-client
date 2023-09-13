export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#fc6504",
          },
          secondary: {
            main: "#ec4e04",
          },
          warning: {
            main: "#f30202",
          },
          info: {
            main: "#0288d1",
          },
          success: {
            main: "#268c2c",
          },

          divider: "rgba(0,0,0,0.12)",
        }
      : {
          primary: {
            main: "#fc6504",
          },
          secondary: {
            main: "#ec4e04",
          },
          warning: {
            main: "#f30202",
          },
          info: {
            main: "#0288d1",
          },
          success: {
            main: "#268c2c",
          },
          divider: "rgba(0,0,0,0.12)",
        }),
  },
  typography: {
    fontFamily: "Roboto",
  },
});
