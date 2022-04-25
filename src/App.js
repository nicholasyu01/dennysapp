import logo from './logo.svg';
import './App.css';
import MuiDashboard from './components/MuiDashboard';

const containerStyle = {
  backgroundColor: '#dedede',
  // backgroundColor: 'red',
  margin: 0,
  padding: 0,
  width: '100%',
  minHeight: '100vh',
}

function App() {
  return (
    <div style={containerStyle}>
      <MuiDashboard />
    </div>
  );
}

export default App;
