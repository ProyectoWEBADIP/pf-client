export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#FB731C",
            contrastText: "#000000",
          },
          secondary: {
            main: "#F0C26E",
          },
          background: {
            paper: "rgba(255,255,255,0.73)",
            default: "#E4E3DF",
          },
          text: {
            primary: "#272323",
          },
        }
      : {
          primary: {
            main: "#1C1C1C",
          },
          secondary: {
            main: "#2b1f1f",
          },
          background: {
            paper: "rgba(206,103,18,0.81)",
            default: "#1C1C1C",
          },
          text: {
            primary: "#272323",
          },
        }),
  },
});
