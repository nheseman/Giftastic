$(document).ready(function () {
    //Initial variables and array
    let i, l, button = "", toDoCount = 0;
    let topics = ["Avengers", "Star Wars", "Fight Club", "Batman", "Mummy", "Zombieland", "The Aviator", "Superman", "Ironman", "Dr. Strange"];
    let loopCounter = sessionStorage.getItem("count");
   
    for (l = 0; l <= loopCounter; l++) {

        if (loopCounter != null) {
            topics.push(sessionStorage.getItem("topic-" + l));
        }
    }

    renderButtons();

    //Render array buttons
    function renderButtons() {
        $("#moviebuttons").empty();
        $("#movie-input").val("");        
        for (i in topics) {
            button = `<button type="button" class="movieButtons col-md-1 col-sm-2 col-xs-3 btn btn-info" value= "${topics[i]}" >${topics[i]}</button>`;
            $("#moviebuttons").append(button);
        }
    }

    //Click event listeners
    $("#addMovie").on("click", function (event) {

        event.preventDefault();
        let topic = $("#movie-input").val().trim();
        if (topic !== "") {
            sessionStorage.setItem("topic-" + toDoCount, topic)
            sessionStorage.setItem('count', toDoCount)
            toDoCount++;
            topics.push(topic);
            renderButtons();
        }
    });

    $(document).on("click", ".movieButtons", function () {
        $("#movies").empty();
        let movieName = $(this).val();
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=gYd4DeZzjLjaqTJXufyDZmZkG5F2cHo6"
        let y, images = ""
        let x = "480w_still";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {            
            for (y in response.data) {
                images = `<div class="panel panel-info col-md-4 col-sm-4 col-xs-6">
                                
                                <h3 class="col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3">Rating: <span class="label label-warning">${response.data[y].rating}</span></h3>
                                <a class="button col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3 btn-lg" href="${response.data[y].images[x].url}" download="${movieName}.jpg"><span class="glyphicon glyphicon-download"></span></a>
                                <img class="staticImage img-square col-md-12 " data-name="${y}" src="${response.data[y].images[x].url}" alt="${movieName}" width="200px" height="200px">
                            </div>`
            
                $("#movies").append(images);

            }

            // animate image on click function
            $(document).on("click", ".staticImage", function () {
                let dataNumber = $(this).attr("data-name");
                $(this).attr("src", response.data[dataNumber].images.downsized.url);
                $(this).removeClass("staticImage");
                $(this).addClass("animatedImage");
            });

            // stop gif
            $(document).on("click", ".animatedImage", function () {
                let dataNumber = $(this).attr("data-name");
                $(this).attr("src", response.data[dataNumber].images[x].url);
                $(this).removeClass("animatedImage");
                $(this).addClass("staticImage");
            });
        });
    });
});