import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css';
import { BrowserRouter as Router } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
