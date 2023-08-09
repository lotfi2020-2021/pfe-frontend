import { environment } from "environments/environment.development";



export const  WEBSOCKET_ENDPOINT = `${environment.WS_BASE_URL}`;
export const  WEBSOCKET_NOTIFY_TOPIC = '/topic/notif';
export const  WEBSOCKET_MESSAGE_TOPIC = '/topic/message';
