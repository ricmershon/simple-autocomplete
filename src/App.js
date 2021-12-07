import Autocomplete from './Autocomplete';
import './App.css';

const App = () => (
    <>
        <h1>React Autocomplete Demo</h1>
        <h2>Start typing</h2>
        <Autocomplete suggestions={['Oranges', 'Apples', 'Bananas', 'Ball']} />
    </>
);


export default App;
