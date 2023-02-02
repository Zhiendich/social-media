import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import MyFriends from "./components/MyFriends";
import Users from "./components/Users";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Authorization from "./pages/Authorization";
import Conversations from "./pages/Conversations";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import News from "./pages/News";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import { selectUser } from "./store/selectors/userSelectors";
import { IUser } from "./types/user";
function App() {
  const { isUserAuth } = useActions();
  const currentUser = useTypedSelector(selectUser);
  const [user, setUser] = React.useState<IUser | null | undefined>(null);
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      isUserAuth();
    }
  }, []);
  React.useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          window.localStorage.getItem("token") ? <Home /> : <Authorization />
        }
      >
        <Route path="profile/:id" element={<Profile />} />
        <Route path="friends/*" element={<Friends />}>
          <Route path="users" element={<Users />} />
          <Route path="myfriends" element={<MyFriends />} />
        </Route>
        <Route path="chats/*" element={<Conversations />}>
          <Route path=":id" element={<Chat />} />
        </Route>
        <Route path="news" element={<News />} />
      </Route>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Authorization />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Registration />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
