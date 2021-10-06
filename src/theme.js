import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    typography: {
        fontSize: 15,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            phone: 700,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;
