import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions
} from "@mui/material";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState(
    () => localStorage.getItem("searchInput") || ""
  );
  const [filteredData, setFilteredData] = useState([]);
  const [alignment, setAlignment] = useState("web");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("searchInput", searchInput);
  }, [searchInput]);

  const handleSearchInputChange = (e, value) => {
    const inputValue = value || e.target.value.toString();
    setSearchInput(inputValue);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleRefreshClick = () => {
    setSearchInput("");
    setFilteredData(data);
  };

  const handleDeleteClick = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container maxWidth="m">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.title)}
        value={searchInput}
        onChange={handleSearchInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search"
            }}
          />
        )}
      />

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="web" onClick={handleRefreshClick}>
          Button Refresh State
        </ToggleButton>
      </ToggleButtonGroup>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredData.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "24px" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "18px" }}
                >
                  {item.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
