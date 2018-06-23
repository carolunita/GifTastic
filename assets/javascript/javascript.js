// Initial array of characters
var characterList = ["Homer Simpson", "Marge Simpson", "Lisa Simpson", "Bart Simpson", "Maguie Simpson", "Ned Flanders"];
var character = "";
var limit = 10;
var oldLimit = 0;
var animate = false;
var index = 0;
var myResponse = "";

// Display all character gifs
function displayGifs() {

	// Makes "load more" button visible
	$("#loadButton").removeAttr("display").css("display", "inline-block");

	// Clears contents of gif-holder div
	$("#gif-holder").empty();

    // Sets character and resets limits
    character = $(this).attr("data-name");
    oldLimit = 0;
    limit = 10;

    runQuery();
}

// Displays all character buttons
function displayCharacters() {

    // Clears contents of button-list div to avoid creating duplicate buttons
    $("#buttons-list").empty();
    
    for (var i = 0; i < characterList.length; i++) {
		// Creates a button and adds its class, data attribute, and text
      	var a = $("<button>").addClass("character").attr("data-name", characterList[i]).text(characterList[i]);
      	// Appends button to list
      	$("#buttons-list").append(a);
    }
}

// Generates and displays gifs with ratings
function runQuery() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "+&api_key=abtwaxkj9ctqguvNzEbF0t6iseLboELV&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response); // Log response for debugging
        myResponse = response; // Updates myresponse variable (for animation)

        // Create and display gifs
        for (var i = oldLimit; i < limit - 1; i++) {
            // Creates div and adds styling classes
            var div = $("<div>");
            div.addClass("holder col-xs-12 col-sm-4 col-md-4 col-lg-4");

            // Creates gif
            var gif = $("<img/>").attr("src", response.data[i].images.fixed_height_still.url).attr("data-name", i).addClass("giphy");
            
            // Adds gif and rating to div, then adds div to gif-holder div
            div.append("<p><b>Rating: </b>" + response.data[i].rating + "</p>").append(gif);
            $("#gif-holder").append(div);
        }
    });
}

// Adds a new character button when clicked
$("#add-char").on("click", function(event) {
    event.preventDefault();
    // Grabs user input and trims excess spaces
    var newCharacter = $("#button-input").val().trim();

    // Adds new character to array of characters
    characterList.push(newCharacter);

    // Updates character buttons
    displayCharacters();
});

// Displays initial character buttons
displayCharacters();

// Displays character gifs when a character is selected
$(document).on("click", ".character", displayGifs);
    
// Loads more gifs if clicked
$("#loadButton").on("click", function() {
    oldLimit = limit;
    limit = oldLimit + 10;
    runQuery();
});

// Animates or pauses gifs when they are clicked
$("#gif-holder").on("click", ".giphy", function() {
    index = $(this).attr("data-name");
    if (animate == true) {
        animate = false;
        $(this).attr("src", myResponse.data[index].images.fixed_height_still.url);
    } else {
        animate = true;
        $(this).attr("src", myResponse.data[index].images.fixed_height.url);
    }
});