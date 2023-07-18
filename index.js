window.onload = async function () {
  // Get the config from config.json
  const config = await fetch("./config.json").then((res) => res.json());

  const serverURL = config.serverUrl;

  // Generate token using token generator server
  document.getElementById("generateToken").onclick = async function () {
    let tokenType = document.getElementById("product").value.toString();
    let appId = document.getElementById("appId").value.toString();
    let appCert = document.getElementById("appCert").value.toString();
    let uid = document.getElementById("userId").value.toString();
    let channelName = document.getElementById("channelName").value.toString();
    let tokenExpiry = document.getElementById("expiry").value.toString();
    let token = "";

    switch (tokenType) {
      case "rtc":
        token = await fetch(
          serverURL + "?type=rtc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appId: appId,
              certificate: appCert,
              channel: channelName,
              uid: uid,
              role: "publisher",
              expire: 3600,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.rtcToken;
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
        break;
      case "rtm":
        token = await fetch(
          serverURL + "?type=rtm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appId: appId,
              certificate: appCert,
              channel: channelName,
              uid: uid,
              role: "publisher",
              expire: 3600,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.rtmToken;
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
        break;
      case "chat":
        token = await fetch(
          serverURL + "?type=chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appId: appId,
              certificate: appCert,
              channel: channelName,
              uid: uid,
              role: "publisher",
              expire: 3600,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.chatToken;
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
        break;
      default:
        break;
    }
  };

  let copyText = document.querySelector(".copy-text");
  copyText.querySelector("button").addEventListener("click", function () {
    let input = copyText.querySelector(".textbox");
    input.select();
    document.execCommand("copy");
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
      copyText.classList.remove("active");
    }, 2500);
  });
};
