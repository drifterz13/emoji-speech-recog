import { render } from "preact";
import { LocationProvider, Router } from "preact-iso/router";
import { ErrorBoundary } from "preact-iso/lazy";
import Home from "./pages/home/index.js";
import NotFound from "./pages/_404.js";

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <ErrorBoundary>
          <Router>
            <Home path="/" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.body);
