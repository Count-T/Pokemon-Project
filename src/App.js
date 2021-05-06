import "./App.css";
import Header from "./Components/Header";
import Form from "./Components/Form";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  pokedex: {
    borderRadius: 25,
    border: "4px solid black",
    height: 800,
    width: 800,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "red",
  },
});
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Header></Header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={classes.pokedex}>
        <Form></Form>
      </div>
    </div>
  );
}

export default App;
