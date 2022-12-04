import classes from "./App.module.css"
import Advice from "./components/Advice";
function App() {
  return (
    <div className={classes.container}>
      <Advice/>
    </div>
  );
}

export default App;
