export const getContacts = async (token: string) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/contact/all-contacts`,
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

export const searchContacts = async (searchText: string, token: string) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/contact/list-of-contacts?q=${searchText}`,
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
    throw Error("Failed to fulfill the search contacts query");
  }
};

export const addContact = async (data: any, token: string) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/contact/add-contact`,
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
    throw Error("Failed to add contact");
  }
};
