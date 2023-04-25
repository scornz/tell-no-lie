import "./App.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto";

import Home from "./Home.tsx";

/**
 * We use createCache in order to prepend all styles instead of appending them,
 * allowing for tailwind-css styling classes to override defaults established
 * by emotion classes.
 * */
const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

function App() {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <div className="App" style={{ fontFamily: "Roboto" }}>
          <Home />
        </div>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default App;
