export const loginFn = async (data: any) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to fetch data for authentication");
  }
};

export const singUpFn = async (data: any) => {
  try {
    const res = await fetch(
      `http://${location.hostname}:3000/api/v1/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const requestData = await res.json();
    return requestData;
  } catch (error) {
    console.log(error);
    throw Error("Failed to fetch data for sign-up");
  }
};
