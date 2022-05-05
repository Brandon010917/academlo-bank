import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";

import { useDispatch, useSelector } from "react-redux";

// Actions
import { logout } from "../../../store/actions/user.actions";
import { useEffect } from "react";

const Header = () => {
  const { isAuth } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <div className={classes.brand}>
        <a href="/">Academlo Bank</a>
      </div>

      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link to="/login" onClick={logoutHandler}>
              Change account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
