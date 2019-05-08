window.onload = function(){
    document.getElementById("submit").onclick = function(){
      var title = document.getElementById("movieTitle").value;

      addResponseToDivsInFrontEnd();

      var urlForTitleAndPoster = "https://www.omdbapi.com/?s=" + title +"&page=5&apikey=640d2cde";

      getData(urlForTitleAndPoster)
        .then( function(data) {

          for (var i = 0; i < 10; i++){
            document.getElementById("titleShow"+ i + "").innerText = data.Search[i].Title;
            document.getElementById("poster" + i + "").src = data.Search[i].Poster;

            // document.getElementById("text" + i + "").innerText = data.Search[i].imdbID;
            // var urlForPlotSummary = "https://www.omdbapi.com/?i=" + data.Search[i].imdbID + "&apikey=640d2cde";
            // getData(urlForPlotSummary)
            //   .then( function(data){
            //
            //     document.getElementById("text"+i+"").innerText = data.Plot;
            //    // $("#text"+i).html(data.Plot);
            //  });
          }
          return data;
        })
        .then( function(data) {
          console.log(data);
          for(var i = 0; i < 10; i++){
            var urlForPlotSummary = "https://www.omdbapi.com/?i=" + data.Search[i].imdbID + "&apikey=640d2cde";
            getData(urlForPlotSummary)
             .then( function(data){

               document.getElementById("text"+i+"").innerText = data.Plot;
             });
            // document.getElementById("text"+i+"").innerText = "AAAAAAAAAAAAA";

          }
        });



    }
}

async function getData(url){
  let response = await fetch(url);

  let data = await response.json();

  return data;
}

function addResponseToDivsInFrontEnd(){
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
             .append($("<h2/>").attr("id", "text"+i+""))    //εδώ να επιστρέφει την περιγραφή
         )
    )

  }
}
