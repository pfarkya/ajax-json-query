(function() {
    $('#search').delegate('#searchButton', 'click', function() {
        $searchtext = $('#searchInput').val();
        var $data = $.ajax({ url: "http://www.omdbapi.com/?s=" + $searchtext, dataType: "json" });
        $data.done(function(msg) {
            console.log(msg);
            $("div.tablecontent").remove();
            $('<div></div>', { "class": "tablecontent" }).appendTo($(".container"))
            $("<h1></h1>", { "text": "Search result for " + $searchtext }).appendTo($(".tablecontent"));
            if (msg.Search) {
                for (var i = 0; i < msg.Search.length; i++) {
                    var movieDetail = $.ajax({ url: "http://www.omdbapi.com/?i=" + msg.Search[i].imdbID }); //getting Details of the movie
                    movieDetail.done(function(msg1) {
                        $('<div></div>', { "class": "row well" }).appendTo($(".tablecontent"));
                        $('<div></div', { "class": "col-md-4" }).appendTo($(".tablecontent>.row:nth-last-child(1)"));
                        $('<img></img>', { "src": msg1.Poster }).appendTo($(".tablecontent>.row:nth-last-child(1)>.col-md-4:nth-child(1)"));
                        $('<div></div', { "class": "col-md-8" }).appendTo($(".tablecontent>.row:nth-last-child(1)"))
                            .append("<h4><strong>Title:</strong>" + msg1.Title + "</h4>")
                            .end()
                            .append("<span><strong>Year:</strong>" + msg1.Year + "</span>")
                            .append("<br><span><strong>Actors:</strong>" + msg1.Actors + "</span>")
                            .append("<br><span><strong>Runtime:</strong>" + msg1.Runtime + "</span>")
                            .append("<br><span><strong>Released:</strong>" + msg1.Released + "</span>")
                            .append("<br><span><strong>Plot:</strong>" + msg1.Plot + "</span>")
                            .append("<br><span><strong>Type:</strong>" + msg1.Type + "</span>")
                            .append("<br><span><strong>Director:</strong>" + msg1.Director + "</span>")
                            .append("<br><span><strong>Writer:</strong>" + msg1.Writer + "</span>")
                            .append("<br><span><strong>Language:</strong>" + msg1.Language + "</span>")
                            .append("<br><span><strong>Rated:</strong>" + msg1.Rated + "</span>")
                            .append("<br><span><strong>Country:</strong>" + msg1.Country + "</span>");

                    });
                }
            } else {
                $("<h3></h3>", { "text": "No Search Available" }).appendTo($(".tablecontent"));
            }

        });;
    });
})();
