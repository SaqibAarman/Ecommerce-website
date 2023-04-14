import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import TopBar from "./Components/TopBar/TopBar";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./Pages/UserList/UserList";
import User from "./Pages/User/User";
import NewUser from "./Pages/NewUser/NewUser";
import ProductsList from "./Pages/ProductsList/ProductsList";
import Product from "./Pages/Product/Product";
import NewProduct from "./Pages/NewProduct/NewProduct";
import Login from "./Pages/Login/Login";

function App() {
  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.isAdmin;

  console.log(admin);
  /* {admin ? <Redirect to="/" /> : <Login />} */

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <TopBar />
            <div className="container">
              <SideBar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductsList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
