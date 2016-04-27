xten = '.txt';
undfndGrpName = 'Others';
img_num = 0;
setID = null;
cTemp= [];

function getCoverValue() {
    $.ajax({
      method: 'GET',
      url: 'data/alldata'+xten,
      dataType: 'json'
    })
    .done(function (coverValues) {
      coverV(coverValues)
    })
    .fail(function () {
      alert('Data loading failed!')
    });
  }


function coverV(coverValues) {
   if((typeof coverValues != 'undefined')) {
    cTemp = coverValues
  } else {
    return cTemp;
  }
}


getCoverValue();


// ---------start menu---------

setTimeout(function() {
    generateMenu();
    menuSmart();
 },100);

 
function generateMenu() {
    var coverVal = coverV(),
    i = 0;
    $.each(coverVal, function(key, val) {
      var vars = [],
      menus = val[0]['menu'],
      splitter = '/';
      if(menus.indexOf(splitter) > -1) {
        if(i < 1) {
          $('.dropdown-dynamic').append('<ul class="dropdown-menu sectionTotal"></ul>');
          i = 1;
        }    
        var menu = menus.split(splitter);
        $.each(menu, function( cat, menuVal) {
          vars.push(menuVal[0]);
          vars[cat] = menuVal;
        });
        for(i=0; i < vars.length; i++) {
          create = vars[i-1];
          if(typeof create == 'undefined') {
            var classFix = vars[i].replace(' ','_');
            if(! $('.dropdown-dynamic ul.sectionTotal li').hasClass('menuS-'+classFix)) {
              $('.dropdown-dynamic ul.sectionTotal').append('<li class="menuS-'+classFix+'"><a>'+vars[i]+'</a></li>');
            }
          }
          for(j=0; j < i; j++) {
            var classFix = vars[i].replace(' ','_');
            var classFixb = vars[i-1].replace(' ','_');
            if(!($('.dropdown-dynamic ul.sectionTotal .menuS-'+classFixb).find('.dropdown-menu').hasClass('menuS-drop'+classFixb))) {
              $('.dropdown-dynamic ul.sectionTotal .menuS-'+classFixb).append('<ul class="dropdown-menu menuS-drop'+classFixb+'"></ul>');
            }
            if(!($('.dropdown-dynamic ul.sectionTotal .menuS-'+classFixb+' .menuS-drop'+classFixb+' li').hasClass('menuS-'+classFix))) {
              var iSet = '<a href="products.html?i='+key+'">'+vars[i]+'</a>';
              /*if(!(typeof vars[i+1] == 'undefined')) {
                var iSet = '<a class="'+key+'">'+vars[i]+'<i class="fa fa-angle-right pull-right"></i></a>';
              } */
              $('.dropdown-dynamic ul.sectionTotal').find('.menuS-'+classFixb+' .dropdown-menu').append('<li class="menuS-'+classFix+'">'+iSet+'</ul>');
            } 
          }
        }
      } else {
        $('.dropdown-dynamic .sectionTotal').append('<li class="menuS-'+menus+'"><a href="products.html?i='+key+'">'+menus+'</a></li>');
      }
    });
}
// ---------end menu---------



hrefFull = window.location.href;
if((hrefFull.indexOf('qatar') >= 0) || (hrefFull.indexOf('ksa') >= 0)) {
    $('body').removeClass('notranslate');
    $('body').addClass('arabic');
    
    $('.swiper-container').attr('dir', 'rtl');
    lang = 'Arabic';
    if (hrefFull.indexOf('qatar') >= 0) {
      var flval1='qatar',
      flval2='ksa',
      flval3='india';
      $('body').addClass('page_qatar');
    }
    if (hrefFull.indexOf('ksa') >= 0) {
      var flval1='ksa',
      flval2='qatar',
      flval3='india';
      $('body').addClass('page_ksa');
    }
} else {
    $('body').removeClass('arabic');
    $('body').addClass('page_india notranslate');
    $('.swiper-container').removeAttr('dir');
    lang = 'English';

    var flval1='india',
    flval2='ksa',
    flval3='qatar';
  }

$('.second-menu-section .btn-group').append('<div class="header-top-entry"><div class="title"><img alt="" src="images/'+flval1+'-flag.png"><span class="text'+flval1+'">'+flval1+'</span><i class="fa fa-caret-down"></i></div><div class="list"><a class="list-entry" href="http://texworld-'+flval2+'.barrackinternational.com/"><img alt="" src="images/'+flval2+'-flag.png"><span class="text'+flval2+'">'+flval2+'</span></a><a class="list-entry" href="http://texworld-'+flval3+'.barrackinternational.com/"><img alt="" src="images/'+flval3+'-flag.png"><span class="text'+flval3+'">'+flval3+'</span></a></div></div>');

/*var getLang = getUrlVars()["lang"];

  if(getLang == 'ar') {
    $('body').addClass('arabic');
    $('body').removeClass('notranslate');
    $('.swiper-container').attr('dir', 'rtl');
    lang = 'Arabic';
  } else {
    $('body').removeClass('arabic');
    $('body').addClass('notranslate');
    $('.swiper-container').removeAttr('dir');
    lang = 'English';
  }*/



//get url parameter
function getUrlVars() {
  var vars = [], hash,
  hrefFull = window.location.href;

  if(window.location.href.indexOf('#')+1) {
    var inHashFull = hrefFull.replace(/\#/g, '&#='),
    start_pos = inHashFull.indexOf('?') + 1,
    hashes = inHashFull.substring(start_pos).split('&');
  } else {
    var hashes = hrefFull.slice(hrefFull.indexOf('?') + 1).split('&');
  }

  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}



//Language setup

function placeholderLanguage() {
  var placeholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  if (placeholders.length) {
    placeholders = Array.prototype.slice.call(placeholders);
    var div = $('<div id="placeholders" style="display:none;"></div>');
    placeholders.forEach(function(input){
      var text = input.placeholder;
      div.append('<div>' + text + '</div>');    
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

$(window).load(function() {
  var footerScroll = new Swiper('.footer-scroll', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    speed: 900,
    autoplay: 3000,
    loop: true,
  });
});


 function languageSelector(lang) {
    var $frame = $('.goog-te-menu-frame:first');
    $frame.contents().find('.goog-te-menu2-item span.text:contains('+lang+')').get(0).click();
  }


//Language setup
$(window).load(function() {
  var getLang = getUrlVars()["lang"];
  languageSelector(lang);
  placeholderLanguage();
});
