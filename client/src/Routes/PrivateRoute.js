import { Navigate } from "react-router";

// const PrivateRoute = ({ component: Component, ...rest }) => {

//   const token = localStorage.getItem("token");
//   if (!token) {
//     return navigate("/Login");
//   }
//   return (
//     <div>
//       <Route component={Component} {...rest} />
//     </div>
//   );
// };

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
