export interface ChatMessageDTO {
  individualChatId: string;
  recipientId: string;
  content: string;
  sentAt: Date;
  seen: boolean;
}
