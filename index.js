import "./styles.css";

const serverURL = "https://agora-token-generator-demo.vercel.app/api/main";

window.onload = async function () {
  arrangeInputs();
  // Generate token using token generator server
  document.getElementById("generateToken").onclick = async function () {
    let tokenType = document.getElementById("product").value.toString();
    let appId = document.getElementById("appId").value.toString();
    let appCert = document.getElementById("appCert").value.toString();
    let uid = document.getElementById("userId").value.toString();
    let channelName = document.getElementById("channelName").value.toString();
    let tokenExpiry = Number(
      document.getElementById("expiry").value.toString()
    );
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
      case "whiteboard-sdk":
        token = await fetch(serverURL + "?type=whiteboard-sdk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessKey: appId,
            SecretKey: appCert,
            role: uid,
            expire: tokenExpiry,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.sdkToken;
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
        break;
      case "whiteboard-room":
        token = await fetch(serverURL + "?type=whiteboard-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessKey: appId,
            SecretKey: appCert,
            role: uid,
            expire: tokenExpiry,
            roomuuid: channelName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.sdkToken;
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
        break;
      case "whiteboard-room":
        token = await fetch(serverURL + "?type=whiteboard-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessKey: appId,
            SecretKey: appCert,
            role: uid,
            expire: tokenExpiry,
            taskuuid: channelName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Process the response data here
            console.log(data);
            document.getElementById("tokenText").value = data.sdkToken;
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
    arrangeInputs();
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

const arrangeInputs = async function () {
  if (document.getElementById("product").value.toString() === "chat") {
    document.getElementById("channelName").hidden = true;
    document.getElementById("appId").placeholder = "Write in your App ID";
    document.getElementById("appCert").placeholder =
      "Write in your App Certificate";
    document.getElementById("userId").placeholder = `Add the User ID`;
  } else if (
    document.getElementById("product").value.toString() == "whiteboard-sdk"
  ) {
    document.getElementById("channelName").hidden = true;
    document.getElementById("appId").placeholder = "Write in your Access Key";
    document.getElementById("appCert").placeholder = "Write in your Secret Key";
    document.getElementById(
      "userId"
    ).placeholder = `"0"(admin), "1"(writer), "2"(reader)`;
  } else if (
    document.getElementById("product").value.toString() == "whiteboard-room"
  ) {
    document.getElementById("channelName").hidden = false;
    document.getElementById("channelName").placeholder = "Write your room UUID";
    document.getElementById("appId").placeholder = "Write in your Access Key";
    document.getElementById("appCert").placeholder = "Write in your Secret Key";
    document.getElementById(
      "userId"
    ).placeholder = `"0"(admin), "1"(writer), "2"(reader)`;
  } else if (
    document.getElementById("product").value.toString() == "whiteboard-task"
  ) {
    document.getElementById("channelName").hidden = false;
    document.getElementById("channelName").placeholder = "Write your task UUID";
    document.getElementById("appId").placeholder = "Write in your Access Key";
    document.getElementById("appCert").placeholder = "Write in your Secret Key";
    document.getElementById(
      "userId"
    ).placeholder = `"0"(admin), "1"(writer), "2"(reader)`;
  } else {
    document.getElementById("channelName").hidden = false;
    document.getElementById("channelName").placeholder = "Add the channel name";
    document.getElementById("appId").placeholder = "Write in your App ID";
    document.getElementById("appCert").placeholder =
      "Write in your App Certificate";
    document.getElementById("userId").placeholder = `Add the User ID`;
  }
};
