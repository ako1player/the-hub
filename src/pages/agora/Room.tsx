import { useState } from "react";
import { initRtc, leaveRoom } from "./Agora";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "../../components/Avatar";

const Room = () =>{
    const {user}:any = useAuthContext();
    const [showRoom, setShowRoom] = useState(false);
    const enterRoom = (e:React.FormEvent) =>{
        e.preventDefault();
        initRtc();
        setShowRoom(true);
    }

    const exitRoom = () =>{
        leaveRoom();
        setShowRoom(false);
    }
    return(
        <div>
            {!showRoom && <form onSubmit={enterRoom}>
                <input name="username" type="submit" value="Enter Room"/>
            </form>
            }
            {showRoom && 
                <div>
                    <button className="btn" onClick={exitRoom}>Leave Room</button>
                    <h3>Users In Call</h3>
                    <li>
                        <Avatar src={user.photoURL} />
                    </li>
                </div>
            }
        </div>
    )
}

export default Room;