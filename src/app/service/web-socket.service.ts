import { Injectable } from '@angular/core';

import * as SockJs from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  getStomp() {
    let socket = new SockJs('http://localhost:8080/api/our-websocket')
    return Stomp.over(socket);
  }

}
