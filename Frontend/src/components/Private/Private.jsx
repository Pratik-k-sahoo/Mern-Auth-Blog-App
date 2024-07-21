import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

const Private = () => {
    const { userData } = useSelector((state) => state.persistedReducer.user);
  return (
    userData ? (
        <Outlet />
    ) : (
        <Navigate to={"/sign-in"} />
    )
  )
}

export default Private