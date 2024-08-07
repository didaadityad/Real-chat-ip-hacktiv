import { useUserStore } from "../../../src/library/userStore"
import AddUser from "./addUser/addUSer"
import "./chatList.css"
import { useEffect, useState } from "react"
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../src/library/firebase"
import { useChatStore } from "../../../src/library/chatStore"


const ChatList = () => {

    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])


    const { currentUser } = useUserStore()
    const { chatId, changeChat } = useChatStore()

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "userchats", currentUser.id),
            async (res) => {
                const items = res.data().chats;

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.recieverId)
                    const userDocSnap = await getDoc(userDocRef)


                    const user = userDocSnap.data()

                    return { ...item, user }
                })

                const chatData = await Promise.all(promises)

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))

            }
        )

        return () => {
            unSub()
        }
    }, [currentUser.id])

    const handleSelect = async (chat) => {

        const userChats = chats.map(item => {
            const { user, ...rest } = item
            return rest
        })

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)

        userChats[chatIndex].isSeen = true


        const userChatsRef = doc(db, "userchats", currentUser.id)
        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            })
            changeChat(chat.chatId, chat.user)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={addMode ? "/minus.png" : "/plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.map((chat) => (

                <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}
                    style={{ backgroundcolor: chat?.isSeen ? "transparent" : "#5183fe" }}
                >
                    <img src={chat.user.avatar || "/avatar.png"} alt="" />
                    <div className="text">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList