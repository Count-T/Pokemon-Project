import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  button: {
    marginLeft: 20,
    height: 55,
    width: 100,
  },
  pokemonImage: {
    height: 500,
    width: 700,
    border: "10px solid black",
    borderRadius: 25,
  },
});
function Form() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pokemonImage, setPokemonImage] = useState(
    "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
  );
  const classes = useStyles();
  const handleSubmit = (e) => {
    setDisplayName(name);
    fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((res) => res.json())
      .then((data) => data.sprites.front_default)
      .then((sprites) => setPokemonImage(() => sprites))
      .catch((error) => {
        setPokemonImage(() => error);
        setDisplayName(() => "No Such Pokemon");
        console.log(error);
      });
  };
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          onChange={(e) => setName(e.target.value)}
          onSubmit={handleSubmit}
          label="Pokemon Name"
          variant="outlined"
          required
        ></TextField>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <br />
        <br />
        <img
          className={classes.pokemonImage}
          src={pokemonImage}
          alt="No Such Pokemon"
        />
        <h2>{displayName}</h2>
      </form>
    </div>
  );
}

export default Form;
