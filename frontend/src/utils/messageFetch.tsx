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
