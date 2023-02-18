import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatMessageDTO} from "../../../models/chatMessageDTO.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = environment.apiUrl;
  chat = environment.apiEndpoints.chat;
  connectToChat = environment.apiEndpoints.chatConnect;
  constructor(private http: HttpClient) { }

  getIndividualChatsIds(personId: string) {
    return this.http.get<string[]>(this.url + this.chat + personId)
  }

  connectToUser(senderId: string, peerId: string): Observable<ChatMessageDTO[]> {
    return this.http.post<ChatMessageDTO[]>(this.url + this.connectToChat, {senderId: senderId, peerId: peerId})
  }
}
