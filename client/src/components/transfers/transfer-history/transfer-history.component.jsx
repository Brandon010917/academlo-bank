import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { getUsersTransfers } from "../../../store/actions/transfers.actions";

// Components
import TransferItem from "../transfer-item/transfer-item.component";

import classes from "./transfer-history.module.css";

const TransferHistory = () => {
  const { user } = useSelector((state) => state.users);
  const { transfers } = useSelector((state) => state.trasnfers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUsersTransfers(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      {transfers.length > 0 &&
        transfers.map((transfer) => <TransferItem transfer={transfer} />)}
    </div>
  );
};

export default TransferHistory;
