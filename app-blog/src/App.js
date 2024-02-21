import './App.css';
import { BlogScreen } from './components/blog/BlogScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';


function App() {
  return (
    <Provider store={ store }>
      <BlogScreen />
    </Provider>
  );
}

export default App;
