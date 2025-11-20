import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider, Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';

const activeUsers = [
    { memberNick: "Martin", memberImage: "/img/martin.webp" },
    { memberNick: "Justin", memberImage: "/img/justin.webp" },
    { memberNick: "Rose", memberImage: "/img/rose.webp" },
    { memberNick: "Nusret", memberImage: "/img/nusret.webp" },

];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length !== 0 ? (
                activeUsers.map((user, index) => (
                  <Card key={index} className="card">
                    <CardOverflow>
                      <AspectRatio component="div" ratio={1}>
                        <img
                          src={user.memberImage}
                          alt={user.memberNick}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </AspectRatio>
                    </CardOverflow>
                    <CardOverflow variant="plain">
                      <Typography className="member-nickname">{user.memberNick}</Typography>
                    </CardOverflow>
                  </Card>
                ))
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}