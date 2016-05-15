
$(function() {

if($('body').hasClass('home')) {
  $('body').addClass('opening')
}
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

function openLanguageSelector() {
  $('.language-selector').css({'visibility': 'visible', 'opacity': 1});
  
}

Pace.on('hide', function(){
  openLanguageSelector();
  setTimeout(function() {
    languageSelector("Arabic");
  },700)
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

$('#arabic-lang').on('click', function() {
//languageSelector("Arabic");
  $('.language-selector').css({'visibility': 'hidden', 'opacity': 0});
  $('body').removeClass('opening');

});

});