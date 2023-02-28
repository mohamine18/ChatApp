export const getConversationInfo = async (token: string, contactId: string) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/conversation/last-message/${contactId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to fetch contacts");
  }
};

export const getConversation = async (token: string, recipientId: string) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/conversation/${recipientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to fetch the conversation");
  }
};

export const addMessage = async (
  token: string,
  data: { recipient: string; text: string }
) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/conversation/add-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to add message");
  }
};

export const updateMessagesStatus = async (
  token: string,
  data: { recipient: string }
) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/conversation/change-message-status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to change messages status");
  }
};
