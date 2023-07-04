if (window.self !== window.top) {
  $(document).ready(function() {
    $("body").css("background-color", "transparent");
    $("#background").css("display", "none");
    $("#quote-machine").css("backdrop-filter", "unset");
    $("#quote-machine").css("-webkit-backdrop-filter", "unset");
  });
}