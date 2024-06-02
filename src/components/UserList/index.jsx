import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

import "./styles.css";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const request = await fetch("http://localhost:8000/api/user", {
        headers: headers,
      });
      if (!request.ok) {
        setLoading(false);
        throw new Error(`HTTP Error! Status: ${request.status}`);
      }
      const result = await request.json();
      setUsers(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return loading ? (
    <div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <div>
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem>
              <ListItemButton
                to={`/users/${item._id}`}
                component={Link}
                key={item._id}
              >
                <ListItemText
                  primary={item.first_name + " " + item.last_name}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
