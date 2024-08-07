import { useUserStore } from "../../../src/library/userStore"
import "./User.css"

const User = () => {
    const {currentUser } = useUserStore()
    return (
        <div className="user">
            <div className="user_">
            <img src={currentUser.avatar || "/avatar.png"} alt="" />
            <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src="/more.png" alt="" />
                <img src="/video.png" alt="" />
                <img src="/edit.png" alt="" />
            </div>
            
        </div>
    )
}

export default User