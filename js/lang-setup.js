
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

/*$(window).load(function() {
  if($('body').hasClass('pace-done')) {
    setTimeout(function() {
    languageSelector("Arabic");
     },100)
}
});*/

// <div class="pace-progress" data-progress-text="99%" data-progress="99" style="transform: translate3d(99.2385%, 0px, 0px);">
//   <div class="pace-progress-inner"></div>
// </div>


function languageSelector(lang) {
  var $frame = $('.goog-te-menu-frame:first');
  $frame.contents().find('.goog-te-menu2-item span.text:contains('+lang+')').get(0).click();
}

Pace.on('hide', function(){
  placeholderLanguage();
});

});