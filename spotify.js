(function () {
  var noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

  var results = $('#results');

  var next;

  function getData(url) {
    var q, type, goClick;

    if(!url) {
      goClick = true;
      q = $('input').val();
      type = $('select').val();
      url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(q) + '&type=' + type;
    }

    $.ajax({
      url: url,
      success: function(data) {
        data = data.artists || data.albums;

        $('#morebutton').remove();

        var myHtml = '';

        var item, img;

        for (var i = 0; i < data.items.length; i++) {
          item = data.items[i];
          img = noImage;
          if (item.images[0]) {
            img = item.images[0].url;
          }

          myHtml += '<div>'
          myHtml += '<a href="' + item.external_urls.spotify + '" target="_blank">';
          myHtml += '<img src="' + img + '">';
          myHtml += '</a>';
          myHtml += '<a href="' + item.external_urls.spotify +'" target="_blank">';
          myHtml += item.name;
          myHtml += '</a>';
          myHtml += '</div>'
        }

        next = data.next;
        if(next) {
          myHtml += '<button id="morebutton">More</button>'

        }

        if(goClick) {
          results.html(myHtml);
        } else {
          results.append(myHtml);
        }

      }
    })
  }

  $('#gobutton').on('click', function() {
    getData();
  });

  $(document).on('click', '#morebutton', function() {
    getData(next);
  });

})();
