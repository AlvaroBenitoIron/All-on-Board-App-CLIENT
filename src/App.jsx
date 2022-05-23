import './App.css';
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <AppRoutes />
      </header>
    </div>
  );
}

export default App;