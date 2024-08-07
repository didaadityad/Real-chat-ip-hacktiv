import User from "./Info/User"
import ChatList from "./chatlist/chatList"
import "./list.css"

const List = () => {
    return (
        <div className="list"> 
        <User/>
        <ChatList/>
        </div>
        
    )
}

export default List