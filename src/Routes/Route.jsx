import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import LogIn from "../Identity/LogIn/LogIn";
import Register from "../Identity/Register/Register";
import SendMoney from "../Component/SendMoney/SendMoney";
import CashOut from "../Component/CashOut/CashOut";
import TransactionList from "../Component/TransactionList/TransactionList";
import UserManagement from "../Component/Admin/UserTable/UserTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "root",
    element: <Root />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "sendMoney",
    element: <SendMoney />,
  },
  {
    path: "CashOut",
    element: <CashOut />,
  },
  {
    path: "TransactionList",
    element: <TransactionList />,
  },
  {
    path: "UserManagement",
    element: <UserManagement />,
  },
]);

