
$(function() {

//language setup

function placeholderLanguage() {
  var placeholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  if (placeholders.length) {
    placeholders = Array.prototype.slice.call(placeholders);
    var div = $('<div id="placeholders" style="display:none;"></div>');
    placeholders.forEach(function(input){
      var text = input.placeholder;
      div.append('<div>' + text + ' </div>');    
    });
    $('body').append(div);
    var originalPH = placeholders[0].placeholder;
    setInterval(function(){
      if (isTranslated()) {
        updatePlaceholders();
        originalPH = placeholders[0].placeholder;
      }
    }, 0);
    function isTranslated() {
      var currentPH = $($('#placeholders > div')[0]).text();
      return !(originalPH == currentPH);
    }
    function updatePlaceholders() {
      $('#placeholders > div').each(function(i, div){
        placeholders[i].placeholder = $(div).text();
      });
    }
  }
}


  Pace.on('hide', function(){
    setTimeout(function() {
        languageSelector("Arabic");
      },0)
     
});



function languageSelector(lang) {
  var $frame = $('.goog-te-menu-frame:first');
  $frame.contents().find('.goog-te-menu2-item span.text:contains('+lang+')').get(0).click();
}

Pace.on('hide', function(){
  setTimeout(function() {
    placeholderLanguage();
  },10)
  
});

});