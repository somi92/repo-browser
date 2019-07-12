import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function LoginSearch({ onSearch }) {
  const [userName, setUserName] = useState("");
  return (
    <TextField
      id="outlined-name"
      label="Name"
      style={{ width: "80%", marginBottom: "2rem" }}
      value={userName}
      onChange={event => setUserName(event.target.value)}
      margin="normal"
      variant="outlined"
      onKeyPress={event => {
        if (event.key === "Enter") {
          onSearch(userName);
        }
      }}
    />
  );
}
