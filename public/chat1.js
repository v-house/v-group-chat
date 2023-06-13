function checkNickname() {
  var nickname = getCookie("nickname");
  if (nickname) {
    document.getElementById("nicknameDisplay").textContent =
      "Welcome, " + nickname + "!";
    yourname = nickname;
  } else {
    window.location.href = "/";
  }
}
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}
