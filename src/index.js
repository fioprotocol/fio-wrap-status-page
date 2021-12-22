import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Provider from "react-redux/es/components/Provider";
import { MainStore } from "./redux/store/configureStore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const store = MainStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
