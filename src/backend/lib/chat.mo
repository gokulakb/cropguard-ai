import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import ChatTypes "../types/chat";

module {
  public type ChatMessage = ChatTypes.ChatMessage;

  public func getChatHistory(
    messages : List.List<ChatMessage>,
    userId : Common.UserId,
  ) : [ChatMessage] {
    messages.filter(func(m) { m.userId == userId }).toArray();
  };

  public func saveChatMessage(
    messages : List.List<ChatMessage>,
    nextId : Nat,
    userId : Common.UserId,
    message : Text,
    role : Common.ChatRole,
  ) : ChatMessage {
    let msg : ChatMessage = {
      id = nextId;
      userId = userId;
      message = message;
      role = role;
      timestamp = Time.now();
    };
    messages.add(msg);
    msg;
  };

  public func clearChatHistory(
    messages : List.List<ChatMessage>,
    userId : Common.UserId,
  ) : () {
    // Keep only messages that belong to other users
    let others = messages.filter(func(m) { m.userId != userId }).toArray();
    messages.clear();
    for (m in others.vals()) {
      messages.add(m);
    };
  };
};
