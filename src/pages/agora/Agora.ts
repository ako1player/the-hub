import AgoraRTC from "agora-rtc-sdk-ng";
import { useAuthContext } from "../../hooks/useAuthContext";

const appId = "cf99923055d842bd858bcebb1d2ab9bb";
const token = null;
const rtcUid = Math.floor(Math.random() * 2032);

let roomid = "main";

let audioTracks:any = {
    localAudioTrack: null,
    remoteAudioTracks:{}
}

let rtcClient:any;

let initRtc = async () =>{
    rtcClient =AgoraRTC.createClient({
        mode:'rtc',
        codec: 'vp8',
    })

    await rtcClient.join(appId, roomid, token, rtcUid);

    audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtcClient.publish(audioTracks.localAudioTrack)

    rtcClient.on('user-joined', handleUserJoined)
    rtcClient.on("user-published", handleUserPublished)
    rtcClient.on("user-left", handleUserLeft);
}

let handleUserJoined = async(user:any) =>{
    console.log("USER JOIN:" , user)
}

let handleUserPublished = async (user:any, mediaType:any) => {
    await rtcClient.subscribe(user, mediaType);

    if (mediaType == "audio"){
        audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
        user.audioTrack.play();
    }
}

let handleUserLeft = async (user:any) => {
    delete audioTracks.remoteAudioTracks[user.uid]
}

let leaveRoom = async () => {
    audioTracks.localAudioTrack.stop()
    audioTracks.localAudioTrack.close()
    rtcClient.unpublish()
    rtcClient.leave()
}

export { initRtc, leaveRoom}
