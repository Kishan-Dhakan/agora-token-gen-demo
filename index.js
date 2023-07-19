import "./styles.css";

const serverURL = "https://agora-token-gen-backend.vercel.app/api/main";

if (document.getElementById("product").value.toString() === "chat") {
  document.getElementById("channelName").hidden = true;
} else {
  document.getElementById("channelName").hidden = false;
}

window.onload = async function () {
  // Generate token using token generator server
  document.getElementById("generateToken").onclick = async function () {
    let tokenType = document.getElementById("product").value.toString();
    let appId = document.getElementById("appId").value.toString();
    let appCert = document.getElementById("appCert").value.toString();
    let uid = document.getElementById("userId").value.toString();
    let channelName = document.getElementById("channelName").value.toString();
    let tokenExpiry = Number(document.getElementById("expiry").value.toString());
    let token = "";

    switch (tokenType) {
      case "rtc":
        token = await fetch(serverURL + "?type=rtc", {
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
            expire: tokenExpiry,
          }),
        })
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
        token = await fetch(serverURL + "?type=rtm", {
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
            expire: tokenExpiry,
          }),
        })
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
        token = await fetch(serverURL + "?type=chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appId: appId,
            certificate: appCert,
            uid: uid,
            role: "publisher",
            expire: tokenExpiry,
          }),
        })
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

  document.getElementById("product").onclick = async function () {
    if (document.getElementById("product").value.toString() === "chat") {
      document.getElementById("channelName").hidden = true;
    } else {
      document.getElementById("channelName").hidden = false;
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
