window.onload = function(){
    document.getElementById("submit").onclick = function(){
      var title = document.getElementById("movieTitle").value;
      // document.getElementById("outputName").innerText = title;

      var url = "https://www.omdbapi.com/?t= " + title +" &apikey=640d2cde"
      const Http = new XMLHttpRequest();
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange=(e)=>{
        //console.log(Http.responseText)
        var parsedJson = JSON.parse(Http.responseText);
        console.log(parsedJson.Title);
        console.log(parsedJson.Poster);
        console.log(parsedJson.Plot);
        document.getElementById("titleShow").innerText = parsedJson.Title;
        document.getElementById("poster").src = parsedJson.Poster;
        document.getElementById("plot").innerText = parsedJson.Plot;
      }
    }
}
