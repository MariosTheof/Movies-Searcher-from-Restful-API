window.onload = function(){
    var buttonHasBeenPressedOnce = false;
    document.getElementById("submit").onclick = function(){
      addResponseToDivsInFrontEnd(buttonHasBeenPressedOnce);
      buttonHasBeenPressedOnce = true;

      var title = document.getElementById("movieTitle").value;

      var urlForTitleAndPoster = "https://www.omdbapi.com/?s=" + title +"&page=5&apikey=640d2cde";

      // Retrieve json query
      var result = getData(urlForTitleAndPoster)
        .then( function(data) {
          for (var i = 0; i < 10; i++){
            // Add Title and Poster to html
            document.getElementById("titleShow"+ i + "").innerText = data.Search[i].Title;
            document.getElementById("poster" + i + "").src = data.Search[i].Poster;
          }
          return data;
        });

        // Retrieve plot summaries
        for (let i = 0; i < 10; i++) {
          result.then(function (data) {
            var urlForPlotSummary = "https://www.omdbapi.com/?i=" + data.Search[i].imdbID + "&apikey=640d2cde";
            return fetch(urlForPlotSummary);
          })
          .then( function(response) {
            return response.json();
          })
          // Add plot summaries to html
          .then( function(data) {
              document.getElementById("text"+i+"").innerText = data.Plot;
          });
        }



    }
}

async function getData(url){
  let response = await fetch(url);

  let data = await response.json();

  return data;
}

function addResponseToDivsInFrontEnd(buttonHasBeenPressedOnce){
  if (!buttonHasBeenPressedOnce) {
    for (var i = 0; i < 10; i++){
      $("#myContainer").append(
        $('<div/>').addClass("wrapper")
           .append(
             $('<div/>').addClass("content")
               .append(
                 $("<figure/>")
                   .addClass("myimg")
                   .append(
                     $('<img src="http://placehold.it/250x200"/>')
                     .attr("id","poster" + i + "")
                   )
               )
               .append($("<h3/>").attr("id", "titleShow"+ i + ""))
               .append($("<p/>").attr("id", "text"+i+""))    //εδώ να επιστρέφει την περιγραφή
           )
      )

    }

  }
}
