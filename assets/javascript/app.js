var topics = ["Santa Claus", "Buddy the Elf", "Rudolph the Red-Nosed Reindeer", "Frosty the Snowman"];

$(document).ready(function() {      
function renderButtons() {
        $("#topics").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic");
            a.addClass("btn");
            a.addClass("btn-success");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#topics").append(a);
            }
        };

    
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    console.log(newTopic);
    topics.push(newTopic);
    console.log(topics);
    renderButtons();
    });

renderButtons();

$(document).on("click", ".topic", function() {
    var topic = $(this).attr("data-name");
    console.log(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=YL2IBXE2wbMpAAKxHKqoJCkVQrwmjwlN&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var holidayImage = $("<img>");
            holidayImage.attr("src", results[i].images.fixed_height_still.url);
            holidayImage.attr("data-still", results[i].images.fixed_height_still.url);
            holidayImage.attr("data-animate", results[i].images.fixed_height.url);
            holidayImage.attr("data-state", "still");
            holidayImage.addClass("gif");
            gifDiv.prepend(p);
            gifDiv.prepend(holidayImage);

            $("#gifs").prepend(gifDiv);
        }
        });
    
    
    
    
    });
$(document).on("click", ".gif", function(){
    console.log("working?");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    });

})