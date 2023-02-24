import React, { useState, useContext } from "react";

type propsTypes = {
  children: React.ReactNode;
};

type conversationContextType = {
  recipientId: string;
  recipientName: string;
  showArea: boolean;
  currentRecipient: (id: string, fullName: string) => void;
  clearRecipient: () => void;
};

export const ConversationContext = React.createContext<conversationContextType>(
  {
    recipientId: "",
    recipientName: "",
    showArea: false,
    currentRecipient: () => {},
    clearRecipient: () => {},
  }
);

const ConversationContextProvider = (props: propsTypes) => {
  const [recipientId, setRecipientId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [showArea, setShowArea] = useState(false);

  const currentRecipient = (id: string, fullName: string) => {
    setRecipientId(id);
    setRecipientName(fullName);
    setShowArea(true);
  };

  const clearRecipient = () => {
    setRecipientId("");
    setRecipientName("");
    setShowArea(false);
  };

  return (
    <ConversationContext.Provider
      value={{
        recipientId,
        recipientName,
        showArea,
        currentRecipient,
        clearRecipient,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
