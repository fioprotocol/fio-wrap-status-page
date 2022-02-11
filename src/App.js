import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBalance, getBalanceSuccess } from './redux/actions/fioActions';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalance());
  }, []);
  return (
    <div className="App">
      <p>Base layout app for the Page</p>
    </div>
  );
}

export default App;
