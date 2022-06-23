$(document).ready(function() {
    $("#fadein").click(function() {
        $("#test").fadeIn("slow");
    });
    $("#fadeout").click(function() {
        $("#test").fadeOut("slow");
    });
    $("#fadeto").click(function() {
        $("#test").fadeTo("slow", 0.3);
    });

})