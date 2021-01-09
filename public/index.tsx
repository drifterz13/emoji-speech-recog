import { render } from "preact";
import { LocationProvider, Router } from "preact-iso/router";
import { ErrorBoundary } from "preact-iso/lazy";
import Home from "./pages/home";
import NotFound from "./pages/_404";

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
