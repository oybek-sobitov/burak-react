import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider, Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverAPi } from "../../../lib/config";

// REDUX SLICE & SELECTOR
const topUsersRetriever = createSelector(
  retrieveTopUsers, 
  (topUsers) => ({topUsers})
);

export default function ActiveUsers() {
  const {topUsers} = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member) => {
                  const imagePath = `${serverAPi}/${member.memberImage}`
                  return (
                  <Card key={member._id} className="card">
                    <CardOverflow>
                      <AspectRatio component="div" ratio={1}>
                        <img
                          src={imagePath}
                          alt={member.memberNick}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </AspectRatio>
                    </CardOverflow>
                    <CardOverflow variant="plain">
                      <Typography className="member-nickname">{member.memberNick}</Typography>
                    </CardOverflow>
                  </Card>
                  );
                })
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