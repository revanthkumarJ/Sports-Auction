import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Button, Card, CardContent, Typography, Container, Box } from "@mui/material";
import playerDataFile from "./ipl_players.xlsx";
import default_image from "./cric.jpeg";
import stadium from "./stadium.jpg";
import india from "./india.png";

const CricketPlayerViewer = ({ data }) => {
  const [index, setIndex] = useState(0);

  const prevPlayer = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const nextPlayer = () => {
    setIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const player = data[index] || {}; // Ensure player is defined

  const playerImage =
    player?.image && (player.image.includes("base64") || player.image.startsWith("http") || player.image.startsWith("www"))
      ? player.image
      : default_image;

  return (
    <Card
      sx={{
        width: "80%",
        height: "auto",
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 5,
        bgcolor: "#FFFFFF",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        flexDirection: "row",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img src={playerImage} alt={player?.["First Name"] || "Player"} style={{ height: "400px", borderRadius: "15px" }} />
      </Box>
      <CardContent sx={{ flex: 2, textAlign: "left" }}>
      {player?.["List Sr.No."] && (
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>
            {player?.["List Sr.No."]} 
          </Typography>
        )}

        {player?.["First Name"] && (
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#000" }}>
            {player?.["First Name"]} {player?.Surname}
          </Typography>
        )}

        {player?.Country && (
          <Typography
            sx={{
              mb: 1,
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {player.Country.toLowerCase() === "india" && (
              <img src={india} alt="India Flag" style={{ width: "40px", height: "30px", borderRadius: "5px" }} />
            )}
            {player?.Country}
          </Typography>
        )}

        {player?.Age && (
          <Typography sx={{ fontSize: "1.4rem", color: "#333" }}>
            <strong>Age:</strong> {player?.Age}
          </Typography>
        )}

        {player?.Specialism && (
          <Typography sx={{ fontSize: "1.4rem", color: "#333" }}>
            <strong>Specialism:</strong> {player?.Specialism}
          </Typography>
        )}

        {player?.["Previous IPLTeam(s)"] && (
          <Typography sx={{ fontSize: "1.4rem", color: "#333" }}>
            <strong>Previous IPL Teams:</strong> {player?.["Previous IPLTeam(s)"]}
          </Typography>
        )}

        
          <Typography sx={{ fontSize: "1.4rem", color: "#d32f2f", fontWeight: "bold" }}>
            <strong>Base Price:</strong> ₹{player?.base || 50} Lakh
          </Typography>
        

        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" onClick={prevPlayer} sx={{ mx: 2, fontSize: "1.2rem", bgcolor: "#555", color: "#fff" }}>
            Previous
          </Button>
          <Button variant="contained" onClick={nextPlayer} sx={{ mx: 2, fontSize: "1.2rem", bgcolor: "#1976d2", color: "#fff" }}>
            Next
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const App = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(playerDataFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setPlayers(parsedData);
      });
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        textAlign: "center",
        padding: 3,
        minHeight: "100vh",
        backgroundImage: `url(${stadium})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#FFD700",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
        }}
      >
        IPL MOCK AUCTION
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#FFD700",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
        }}
      >
        Conducted By Aadhya Team , SRC , CSE Department
      </Typography>
      {players.length > 0 ? <CricketPlayerViewer data={players} /> : <Typography color="#FFF">Loading players data...</Typography>}
    </Container>
  );
};

export default App;
