import IncidenciasView from './components/IncidenciasView';
import './App.css';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <IncidenciasView />
    </div>
  );
}

export default App;