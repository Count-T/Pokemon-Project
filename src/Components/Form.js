import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
const useStyles = makeStyles({
  button: {
    marginLeft: 20,
    height: 62,
    width: 120,
  },
  pokemonImage: {
    height: 300,
    width: 600,
    border: "10px solid black",
    borderRadius: 25,
    background: "white",
  },
  textField: {
    width: 475,
    backgroundColor: "lightblue",
    border: "4px solid black",
  },
  table: {
    border: "4px solid black",
    width: 620,
    marginLeft: "auto",
    marginRight: "auto",
  },
  displayName: {
    color: "white",
  },
});

function createData(name, calories) {
  return { name, calories };
}

function Form() {
  const [weight, setWeight] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [attackMoves, setAttackMoves] = useState("");
  const rows = [
    createData("Weight (Kg)", weight),
    createData("Pokedex #", id),
    createData("Type", type),
    createData("Height (cm)", height),
    createData("Attack Moves", attackMoves),
  ];

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("Pokemon Name");
  const [pokemonImage, setPokemonImage] = useState(
    "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
  );
  const classes = useStyles();
  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") {
      fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase())
        .then((res) => res.json())
        .then((data) => {
          setPokemonImage(() => data.sprites.front_default);
          setDisplayName(() => name.toUpperCase());
          setId(() => data.id);
          setType(() => data.types[0].type.name);
          setWeight(() => data.weight / 10.0);
          setHeight(() => data.height * 10.0);
          setAttackMoves(
            () =>
              data.moves[0].move.name +
              "," +
              data.moves[1].move.name +
              "," +
              data.moves[2].move.name
          );
          console.log(data);
          console.log(data.types[0].type.name);
        })
        .catch((error) => {
          setPokemonImage(
            () =>
              "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
          );
          setDisplayName(() => "NO SUCH POKEMON");
          console.log(error);
        });
      e.preventDefault();
    }
  };
  const handleSubmit = (e) => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase())
      .then((res) => res.json())
      .then((data) => {
        setPokemonImage(() => data.sprites.front_default);
        setDisplayName(() => name.toUpperCase());
        setId(() => data.id);
        setType(() => data.types[0].type.name);
        setWeight(() => data.weight);
        console.log(data);
        console.log(data.types[0].type.name);
      })
      .catch((error) => {
        setPokemonImage(
          () =>
            "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
        );
        setDisplayName(() => "NO SUCH POKEMON");
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <h2 align="center" variant="h4" className={classes.displayName}>
          {displayName}
        </h2>
        <img
          className={classes.pokemonImage}
          src={pokemonImage}
          alt="No Such Pokemon"
        />
        <br />
        <br />
        <form noValidate autoComplete="off">
          <TextField
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleSubmitEnter}
            label="Pokemon Name"
            color="primary"
            variant="filled"
            className={classes.textField}
            required
          ></TextField>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
        <br />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Form;
