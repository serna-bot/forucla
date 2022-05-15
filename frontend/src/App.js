import logo from './oonga_boonga.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded')});
    </div>
  );
}

export default App;
