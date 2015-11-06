var page=1;
var show_list = false;
var toggle = false;
var isLoadingData = false;
var isGridLoad = false;
var isShowSearch = false;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

$(document).ready(function() {
       
		$("#menu-img").click(function(){
            if(!show_list){
                $("#left-menu").animate({left:"0px"},300,'swing');
                $("#menu-img").animate({left:"-20px"},100);
                show_list = true;
            }else {
                $("#left-menu").animate({left:"-280px"},300,'swing');
                $("#menu-img").animate({left:"0px"},100);
                show_list = false;
            } 
		});
    
        $("#state-view").click(function(){
            if(!toggle){
              showGrid();
            }else{
              hideGrid();
            }
		});
        
        $("#online-btn").click(function(){
            $("#online-btn").removeClass('button-active');
            $("#offline-btn").addClass('button-active');
        });
    
        $("#offline-btn").click(function(){
            $("#offline-btn").removeClass('button-active');
            $("#online-btn").addClass('button-active');
        });
    
        
    
    getJsonAll(page);
    
    // Cang thang qua di ...
    $("#search-btn").click(function(){
            if(!isShowSearch){
               showSearch();
            }else{
               hideSearch();            
            }
    });
    
    
   $("#contain").scroll(function() {   
       if($("#contain").scrollTop() + $("#contain").height() >= $("#list-view").height()) {
           //appendList();
           getJsonAll(page);
           page++;
           return;
       }
   });
     
    
});



$(document).on({
    ajaxStart: function() { $("#loading-process").css("display","block");    },
    ajaxStop: function() { $("#loading-process").css("display","none"); }  
});




function getJsonAll(page){
    var url = "http://webtruyen.com/api3/all?cate=new&page="+page +"&perpage=10";
  $.getJSON( url, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      appendList(data);
      appendGrid(data);
    });
}

function appendList(data){
    for(var i=0 ;i<data.story.length ;i++) {
        var name = data.story[i].name;
        var chapter = data.story[i].chapter;
        var urlimg = data.story[i].imgurl;
        var id = data.story[i].id;
        $(".lis-view-index").append('<a href="info.html?id=' + id + '"><li class="item-list"> <img src="'+urlimg +'"> <p class="p-name">'+name +'</p><p class="p-chapter">'+chapter +'</p><img class="star-img" src="images/star-img.png"><div class="clr"></div></li></a>');  
    }
}


function getList(view){
    //alert(" Ban da click xem truyen nhieu nhat ");
    var url = "http://webtruyen.com/api3/all?cate="+ view + "&page=1&perpage=10";
    $.getJSON( url, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      resetLits(data);
    });
}
function resetLits(data){
    $( ".lis-view-index").empty();
    for(var i=0 ;i<data.story.length ;i++) {
        var name = data.story[i].name;
        var chapter = data.story[i].chapter;
        var urlimg = data.story[i].imgurl;
         var id = data.story[i].id;
        $(".lis-view-index").append('<a href="info.html?id=' + id + '"><li class="item-list"> <img src="'+urlimg +'"> <p class="p-name">'+name +'</p><p class="p-chapter">'+chapter +'</p><img class="star-img" src="images/star-img.png"><div class="clr"></div></li></a>');  
    }  
    hideMenu();
}

function hideMenu(){
    $("#left-menu").animate({left:"-280px"},300,'swing');
    $("#menu-img").animate({left:"0px"},100);
    show_list = false;
}
// Cac ham can phai lam chuc nang lai cho cuc ky toi uu;
function showGrid(){
    if(!isGridLoad){
        getGrid();
        isGridLoad = true;
    }
    $("#grid-view").css("visibility","visible");
    $("#list-view").css("visibility","hidden");  
    $("#state-view img").attr('src', 'images/list-img.png');
    toggle = true;
    $("#contain" ).scrollTop(0);
}

function hideGrid(){
     $("#grid-view").css("visibility","hidden");
     $("#list-view").css("visibility","visible");
     $("#state-view img").attr('src', 'images/grid-img.png');
     toggle = false;
}

function getGrid(){
    var url = "http://webtruyen.com/api3/all?cate=view&page=" +page + "&perpage=10";
    $.getJSON( url, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) { 
      appendGrid(data);
    });
}

function appendGrid(data){
    for(var i=0 ;i<data.story.length ;i++) {
        var id = data.story[i].id;
        var urlimg = data.story[i].imgurl;
        $(".grid-view-index").append('<a href="story.html?id=' + id + '"><li><img src="'+urlimg+'"></li></a>');  
    }  
}

function showSearch() {
     $("#search-input").css("display","block");
     $("#search-input").animate({width:"250px"},150,'swing');
     isShowSearch = true;
}

function hideSearch(){
    $("#search-input").animate({width:"0px"},150,'swing',function(){
    $("#search-input").css("display","none");
    isShowSearch = false;
    }); 
}


function getSearch(){ // chinh sua page lai
     var searchvalue = $("#search-input").val();
     var url = "http://webtruyen.com/api3/all?cate=search&page=1&perpage=10&searchStr=" + searchvalue ;
    
    $.getJSON( url, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      hideSearch();
      resetLits(data);
    });
}
