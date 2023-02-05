const requestNewToken = async (callback, callbackParams) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    refresh_token: localStorage.getItem("sc_ref_token"),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:4000/token", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result) {
        localStorage.setItem("sc_acc_token", result.access_token);
        callback(...callbackParams);
      }
    })
    .catch((error) => console.log("error", error));
};

export default requestNewToken;
