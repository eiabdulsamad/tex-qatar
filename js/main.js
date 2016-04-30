 
$(function() {

  rating('.rating-box');


$(document).on('click', '.open-product', function(){
  var dataID = $(this).attr('data-id');
  

    setTimeout(function() {
    galleryTop.onResize();
    galleryThumbs.onResize();
  },100)


  img_num = parseInt($(this).attr('data-img_num'));
  if(typeof img_num == 'undefined') {
    img_num = 1;
  }

getProductValue(dataID, img_num);


});


function listView(dataID, homeP) {

        coverVal = coverV();

        if(dataID == 'all') {

          $.each(coverVal, function( key, val) {
            var all = true;
            var val = val[0]['title'];
            if(homeP==true) {
              var toHome = coverVal[key][0]['toHome'];
              if(toHome == 'yes') {
                visibleThis (key, val, coverVal, all, homeP);
              }
            } else {
            visibleThis (key, val, coverVal, all);
            }
            
          });
        } else {
          var val = coverVal[dataID][0]['title'],
          all = false;
          visibleThis (dataID, val, coverVal, all);
        }

        }




if((window.location.href.indexOf('?')+1) && (! $('body').hasClass('home'))) {

  if($('body').hasClass('product-view')) {
    
    var dataID = getUrlVars()["i"],
    img_num = getUrlVars()["n"];

    getProductValue(dataID, img_num);

    var hash = getUrlVars()["h"];

    if(typeof hash != 'undefined') {
      setTimeout(function() {
        $('#'+hash).ScrollTo({duration: 500});
        setTimeout(function() {
          $('#order-name').focus();
        },700)
      },700)
    }

  }

  if($('body').hasClass('products')) {
    var dataID = getUrlVars()["i"];

    /*var myVar = setInterval(function(){
      if($('body').hasClass('pace-done')) {
        listView(dataID);
        clearInterval(myVar);
      }
    }, 100);*/
      
      Pace.on('hide', function(){
        listView(dataID);
      });
    
    
  }
} else {

  if($('body').hasClass('home')) {
    homeP = true;
  }

  if($('body').hasClass('products')) {
    homeP = false;
  }

  /*var myVar = setInterval(function(){
    if($('body').hasClass('pace-done')) {
      listView('all', homeP);
      clearInterval(myVar);
    }
  }, 100);*/

  Pace.on('hide', function(){
    listView('all', homeP);
  });
    
      
    
  
  // setTimeout(function() {
  //     listView('all', homeP);
  //   },3000)
}

      
      


      function visibleThis (key, val, coverVal, all, homeP) {
        

        var title = val;
        if(! all) {
          rpt = '';
          idC = '';
          mainView =  '<div class="clearfix '+key+'"><h2 class="title text-center main-heading">'+title+'</h2></div>';
        } else {
          

        


         var oldsetID = setID,
         secVal = coverVal[key][0]['menu'].split('/')[1];


         if (typeof secVal != 'undefined') {
            mainHd = coverVal[key][0]['menu'].split('/')[0];
         } else {
            mainHd = undfndGrpName;
         }
         setID = mainHd.replace(' ', '_');
         
          if(oldsetID != setID) {
            rpt = 1;
            $('#listView .row').append('<div class="clearfix"  id=itemID'+setID+'><h2 class="title text-center main-heading">'+mainHd+'</h2></div>');
          } else {
            rpt++;
          }
          
          mainView = '<div class="'+key+'"></div>';
          idC = '#itemID'+setID;
        }

        $('#itemID'+setID).attr('data-rpt', rpt);

        $('#listView .row '+idC).append(mainView);


        $.ajax({
              method: 'GET',
              url: 'data/'+key+xten,
              dataType: 'json'
            })
          .done(function (data) {
              appendToListView(key, data, coverVal, all, title, homeP);
          })
          .fail(function () {
            alert('Data loading failed!')
          });

       }



function appendToListView(dataID, data, coverVal, all, title, homeP) {


totalItem = Object.keys(data).length;

$.each(data, function( key, val ) {

if((homeP)||(all)) {
  cls = 'allview';
  var fileName = coverVal[dataID][0]['homePhoto'];
} else {
  cls = 'null';
  fileName = data[key][0]["fileName"];
}
      var newItm = data[key][0]["new"],
      star = data[key][0]["star"],
      sNo = data[key][0]["sNo"];
      rprVal = $('#listView .'+dataID).parent().attr('data-rpt'),
      align = '';
      if (rprVal==1) {
        var align = 'centerBlock1'
      } else if (rprVal==2) {
          var align = 'col-md-offset-2'
      }
      $('#listView .'+dataID).append('<div class="col-sm-4 '+cls+' '+align+'"><div class="product-image-wrapper"><div class="single-products"><div class="productinfo text-center"><img src="images/products/'+dataID+'/'+fileName+'" alt="'+title+'" /><h2 class=new-'+newItm+'>New</h2><div class="rating-box hide'+homeP+all+'" data-star="'+star+'"></div><p>'+title+'</p></div><div class="product-overlay"><div class="overlay-content"><div class="flex ht-100"><div><a href="products.html?i='+dataID+'" class="vis'+all+' btn btn-default round-button view-more"><span><i class="fa fa-plus"></i>View More</span></a><a class="btn btn-default quick-view round-button open-product" data-id="'+dataID+'" data-img_num="'+key+'"><span><i class="fa fa-expand"></i>Quick View</span></a><a href="product-view.html?i='+dataID+'&n='+key+'" class="btn btn-default round-button view-product"><span><i class="fa fa-eye"></i>View Product</span></a></div></div></div></div></div><div class="choose"><ul class="nav nav-pills nav-justified"><li><a><i class="fa fa-info"></i>'+sNo+'</a></li><li class="item-number"><a><i class="fa fa-file-o"></i>'+key+'/'+totalItem+'</a></li></ul></div></div></div>');



  if((all) && (1 <= key)) {
          return false
  }

});
rating('#listView .rating-box');
}



// -------------------------------------------------------------------------------




function getProductValue(dataID, img_num) {



  $('.detail-vis').attr('id', dataID);
  $('.overlay-popup').addClass('visible active');

  var tempOpen = $('#'+dataID).attr('data-temp');

  if(tempOpen !=dataID) {
    $('#'+dataID).find('.swiper-slide, .tags-entry a, .tags-entry i').remove();
    // $('#'+dataID).find('').remove();

    $.ajax({
      method: 'GET',
      url: 'data/'+dataID+xten,
      dataType: 'json'
    })
    .done(function (data) {
      getContents(0, data, dataID)
      appends(dataID, data);
    })
    .fail(function () {
      alert('Data loading failed!')
    });
  }


setTimeout(function() {
  if (0 < img_num ) {
      goTo = img_num;
 } else {
  goTo = 1;
 }
 galleryTop.slideTo(goTo-1);
 getContents(img_num-1);
},60);

}


// function gotoImg(data) {
//   tags = valData["tags"],
//   fullTags = jQuery.param( tags ).split('&')
// }


function appends(dataID, data) {

  

coverVal = coverV();
//console.log(coverVal);
//console.log(coverVal[dataID][0]["totalImages"])

  //var totalImages = coverVal[dataID][0]["totalImages"];
if($('body').hasClass('home')) {
  var totalImages = parseInt(coverVal[dataID][0]["homeImages"]);
}
if(($('.title-content-section').find('.whole-data-'+dataID).length)<1) {
  $('.title-content-section').append('<div class="whole-data-'+dataID+'"></div>')

}
$.each(data, function( key, val ) { 
  //console.log(key);
  var fileName = data[key][0]["fileName"],
  zoomAvl = data[key][0]["zoom"];
  if (zoomAvl == 'yes') {
    zoomFile = '/zoom/';
  } else {
    zoomFile = '/';
  }
    galleryTop.appendSlide([
      '<div class="swiper-slide"><img src="images/products/'+dataID+zoomFile+fileName+'"></div>'
      ]);
    galleryThumbs.appendSlide([
      '<div class="swiper-slide" style="background-image:url(images/products/'+dataID+'/'+fileName+')"></div>'
      ]);
  
  if(!($('.whole-data-'+dataID).hasClass('filled-data'))) {
    var createTitle = '<div class="title-main-bx caption-cont-'+dataID+' hidden" data-num="'+key+'"><h1 class="product-title">'+coverVal[dataID][0]["title"]+'</h1><h3 class="product-subtitle">'+data[key][0]["subTitle"]+'</h3><div class="product-description detail-info-entry">'+coverVal[dataID][0]["description"]+'</div></div>'
    $('.title-content-section .whole-data-'+dataID).append(createTitle);
  }

  if(totalImages <= key) {
    return false;
  }
  });

    $('.whole-data-'+dataID).addClass('filled-data');

  $('#'+dataID).attr('data-temp', dataID);


}


function getContents(index, data, dataID){

  indVal = index+1;

  if(typeof data != 'undefined') {
    valData = data;
  }

  if(typeof dataID != 'undefined') {
    id = dataID;
  }

  coverVal = coverV();
  /*var title = coverVal[id][0]["title"],
  description = coverVal[id][0]["description"],
  subTitle = valData[indVal][0]["subTitle"],*/

  sNo = valData[indVal][0]["sNo"],
  star = valData[indVal][0]["star"],
  sizes = valData[indVal][0]["sizes"].split(',')
  colors = valData[indVal][0]["colors"].split(',');
//alert(id);
 //.caption-cont-school_uniforms data-num=[0]
$('.title-main-bx').addClass('hidden');
$('.whole-data-'+id+' div[data-num='+(index+1)+']').removeClass('hidden');

// $('.whole-data-'+id).find('data-num=["'+(index+1)+'"]')
  
  // search in array

  /*for(a=1; a <=17; a++) {
     returnedData = $.grep(valData[a], function(element, index){
          return element["fileName"] == "2.jpg";
    });
    console.log(returnedData);
    }*/

// search in array

  
  $('#'+id).find('.size-entry .entry').remove();
  $('#'+id).find('.color-entry .entry').remove();

  $.each(coverVal, function(key, val) {
  titleTags = val[0]['title'];
  
    if(dataID != key) {
    $('#'+dataID).find('.tags-entry').append('<span><a href="products.html?i='+key+'">'+titleTags.replace(/\+/g, ' ')+'</a><i></i></span>');
  }
  
  });

  $.each(sizes, function(i, size) {
    $('#'+id).find('.size-entry').append('<div class="entry">'+size+'</div>')
  });

  $.each(colors, function(i, color) {
    $('#'+id).find('.color-entry').append('<div class="entry" style="background-color: '+color+'">&nbsp;</div>')
  });


  ratingBox = $('#'+id).find('.rating-box');
  ratingBox.attr('data-star', star)
  rating(ratingBox);

$('#'+id).attr('data-img_num');
$('#'+id).find('a.order-btn').attr('href', 'product-view.html?i='+id+'&n='+(indVal)+'&h='+'order-now');

  // $('#'+id).find('.product-title').text(title);
  // $('#'+id).find('.product-subtitle').text(subTitle);
  // $('#'+id).find('.product-description').text(description);
  $('#'+id).find('.current span').text(sNo);
  $('.sNo').val(sNo);
}



$('.product-view .order-btn').click(function() {
      $('#order-now').ScrollTo();
      setTimeout(function() {
        setTimeout(function() {
          $('#order-name').focus();
        },300)
      },300)
});

//swiper
setPerView();
$(window).resize(function(event) {
  setPerView();
});

function setPerView() {
sldPerView = 3;
  if($(window).width() < 991) {
    sldPerView = 2;
  } 
  if($(window).width() < 460) {
    sldPerView = 1;
  }

}

var carousalScroll = new Swiper('.carousel-track', {
  nextButton: '.right.recommended-item-control',
  prevButton: '.left.recommended-item-control',
  speed: 1000,
  autoplay: 5000,
  loop: true,
  slidesPerView: sldPerView,
        paginationClickable: true,
        spaceBetween:20
});

var galleryTop = new Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
         // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true,
        mousewheelControl: true,
        keyboardControl: true,
        // effect: 'fade',
        onSlideChangeEnd: function (swiper) {
          getContents(swiper.activeIndex)
        }
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;


//rating
function rating(thisSelector) {
  $(thisSelector).find('.star').remove();
  $(thisSelector).each(function() {
    var starNo = parseInt($(this).attr('data-star'));
    for(i = 0; i < 5; i++) {
      if(i < starNo) {
        var off = '';
      } else {
        var off = 'off';
      }
      $(this).append('<div class="star '+off+'"><i class="fa fa-star"></i></div>')
    }
  });
}





//close popup

$(document).on('keyup',function(evt) {
  if (evt.keyCode == 27) {
   closePopUp();
 }
});

$('.close-popup, .overlay-popup .close-layer').on('click', function(){
  closePopUp();
});

function closePopUp() {
  $('.overlay-popup.visible').removeClass('active');
  setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);

}

});
