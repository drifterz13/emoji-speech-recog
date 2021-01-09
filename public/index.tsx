import { render } from "preact";
import Home from "./pages/Home";

export function App() {
  return (
    <div class="app">
      <Home />
    </div>
  );
}

render(<App />, document.body);
