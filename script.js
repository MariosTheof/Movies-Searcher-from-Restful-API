window.onload = function(){
    document.getElementById("submit").onclick = function(){
      var title = document.getElementById("movieTitle").value;

      var url = "https://www.omdbapi.com/?s=" + title +"&page=5&apikey=640d2cde"


      const Http = new XMLHttpRequest();
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange=(e)=>{
        var parsedJson = JSON.parse(Http.responseText);

        for (var i = 0; i < 10; i++){
          document.getElementById("titleShow"+ i + "").innerText = parsedJson.Search[i].Title;
          document.getElementById("poster" + i + "").src = parsedJson.Search[i].Poster;
          var plot = getPlotSummary(parsedJson.Search[i].imdbID);

          document.getElementById("text" + i + "").innerText = plot;
        }
      }

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

// Δεν επιστρέφει το json.Plot, μάλλον επειδή μπλέκουμε ασυγχονα calls
function getPlotSummary(id){
  var plotSummary = "";
  var urlForPlotSearches = "https://www.omdbapi.com/?i=" + id + "&apikey=640d2cde"
  $.getJSON( urlForPlotSearches, function( json ) {
    console.log("success");
  })
  .done( function( json ) {
    plotSummary = json.Plot;
    console.log("greater success");
    console.log( json.Plot );
    return plotSummary;
  })
  .fail( function() {
    console.log("fail");
  })

  return "I return nothing"; // change it to null later
}

/* Returns the plot summaries of a search page
function getPlotSummaries(parsedJson) {
  let plotSummaries = new Array(10);
  for (var i = 0; i < 10; i++){
    var urlForPlotSearches = "https://www.omdbapi.com/?i=" + parsedJson.Search[i].imdbID + "&apikey=640d2cde"
    $.getJSON( urlForPlotSearches, function( json ) {
      plotSummaries[i] = json.Plot;
    })
  }
  return plotSummaries;
}
*/
