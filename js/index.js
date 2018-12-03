time_setting = 30;
random_setting = 100;
target_setting = $("#output");
StringType(input_text, target_setting, 0, time_setting, random_setting);

var character_length = 100;
var index = 0;
var letters = $("#input_text").val();
var started = false;
var current_string = letters.substring(index, index + character_length);
var wordcount = 0;

function StringType(input, target, current, time, random) {
    if (current > input.length) {
    }
    else {
        current += 1;
        target.text(input.substring(0, current));// get all the string from input window
        setTimeout(function () {
            StringType(input, target, current, time, random);//Ricersive call untill string persist
        }, time + Math.random() * random);
    }
}




$("html, body").click(function () {
    $("#textarea").focus();
});

$("#target").text(current_string);
$(window).keypress(function (evt) {
    if (!started) {
        start();
        started = true;
    }
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charTyped = String.fromCharCode(charCode);
    if (charTyped == letters.charAt(index)) {
        if (charTyped == " ") {
            wordcount++;
            $("#wordcount").text(wordcount);
        }
        index++;
        current_string = letters.substring(index, index + character_length);
        $("#target").text(current_string);
        $("#your-attempt").append(charTyped);
        if (index == letters.length) {
            wordcount++;
            $("#wordcount").text(wordcount);
            $("#timer").text(timer);
            if (timer == 0) {
                timer = 1;
            }
            wpm = Math.round(wordcount / (timer / 60));
            $("#wpm").text(wpm);
            stop();
            finished();
        }
    } else {
        $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
        errors++;
        $("#errors").text(errors);
    }
});

var timer = 0;
var wpm = 0;
var errors = 0;
var interval_timer;


$("#pause").click(function () {
    stop();
});


function start() {
    interval_timer = setInterval(function () {
        timer++;
        $("#timer").text(timer);
        wpm = Math.round(wordcount / (timer / 60));
        $("#wpm").text(wpm);
    }, 1000)
}

function stop() {
    clearInterval(interval_timer);
    started = false;
}



function finished() {
    alert("Your typing test are completed.");
}

