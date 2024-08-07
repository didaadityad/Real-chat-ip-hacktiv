import { useEffect } from "react"
import Chat from "../commponent/chats/chats"
import Detail from "../commponent/details/details"
import List from "../commponent/lists/list"
import Login from "../commponent/login/login"
import Notification from "../commponent/notiffication/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./library/firebase"
import { useUserStore } from "./library/userStore"
import { useChatStore } from "./library/chatStore"

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)


    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  console.log(currentUser)

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="container">
      {
        currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>

        ) : (
          <Login />
        )}
      <Notification />
    </div>
  )
}

export default App