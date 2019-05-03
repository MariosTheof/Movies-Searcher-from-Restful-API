/*
  TODO Το search option του API δεν επιστρεφει το plot, αρα θα πρέπει να κληθεί
  το search by title για καθε ταινία για να έχουμε το plot.

*/
window.onload = function(){
    document.getElementById("submit").onclick = function(){
      var title = document.getElementById("movieTitle").value;
      // document.getElementById("outputName").innerText = title;

      var url = "https://www.omdbapi.com/?s=" + title +"&page=5&apikey=640d2cde"
      const Http = new XMLHttpRequest();
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange=(e)=>{
        //console.log(Http.responseText)
        var parsedJson = JSON.parse(Http.responseText);
        // console.log(parsedJson.Search[0].Title);
        // console.log(parsedJson.Search[0].Poster);
        document.getElementById("titleShow").innerText = parsedJson.Search[0].Title;
        document.getElementById("poster").src = parsedJson.Search[0].Poster;
      }
    }

}
$(document).ready(function(){
     $("#submit").click(function(){
       $("#myContainer").append(
         $('<div/>').addClass("wrapper")
            .append(
              $('<div/>').addClass("content")
                .append(
                  $("<figure/>")
                    .addClass("myimg")
                    .append(
                      $('<img src="http://placehold.it/250x200"/>')
                      .attr("id","poster")
                    )

                )
                .append($("<h3/>").attr("id", "titleShow"))
                // .append($("<p/>").attr()) εδώ να επιστρέφει την περιγραφή
            )
       )
     })
 });
