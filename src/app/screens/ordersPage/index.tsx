import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquriy } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobal";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverAPi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const {orderBuilder, authMember} = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquriy>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    
    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  // HANDLERS

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if(!authMember) history.push("/");
  return (
      <div className="order-page">
        <Container className="order-container">
          <Stack className={"order-left"}>
            <TabContext value={value}>
              <Box className={"order-nav-frame"}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className={"table_list"}
                  >
                    <Tab label="PAUSED ORDERS" value={"1"} />
                    <Tab label="PROCESS ORDERS" value={"2"} />
                    <Tab label="FINISHED ORDERS" value={"3"} />
                  </Tabs>
                </Box>
              </Box>
              <Stack className={"order-main-content"}>
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>

          <Stack className={"order-right"}>
            <Box className={"order-info-box"}>
              <Box className={"member-box"}>
                <div className={"order-user-img"}>
                  <img
                    src={authMember?.memberImage 
                        ? `${serverAPi}/${authMember.memberImage}` 
                        : "/icons/default-user.svg"}
                    className={"order-user-avatar"}
                    alt=""
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={authMember?.memberType === MemberType.RESTAURANT ? "/icons/restaurant.svg" : "/icons/user-badge.svg"}
                      className={"order-user-prof-img"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="name-prof-info">
                  <span className={"order-user-name"}>{authMember?.memberNick}</span>
                  <span className={"order-user-prof"}>{authMember?.memberType}</span>
                </div>
              </Box>
              <Box className={"liner"}></Box>
              <Box className={"order-user-adress"}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "10px"}}>
                  <LocationOnIcon/>
                  <p>{authMember?.memberAddress 
                  ? authMember.memberAddress 
                  : "Do not exist"}</p>
                </div>
              </Box>

            </Box>

            <Box className={"cards-box"}>
              <TextField
                variant="outlined"
                className="card-input"
                placeholder="Card number : 5243 4090 2002 7495"
              />

              <div className="card-date-cvv">
                <TextField
                variant="outlined"
                className="card-input"
                placeholder="07/24"
              />
              <TextField
                variant="outlined"
                className="card-input"
                placeholder="CVV:010"
              />
              </div>

              <TextField
                variant="outlined"
                className="card-input"
                placeholder="Justin Robertson"
              />
              <div className="cards-img">
                <img src="/icons/western-card.svg" alt=""/>
                <img src="/icons/master-card.svg" alt=""/>
                <img src="/icons/paypal-card.svg" alt=""/>
                <img src="/icons/visa-card.svg" alt=""/>
              </div>
            </Box>
          </Stack>
        </Container>
      </div>
    );
  }