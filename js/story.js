var storyData;
var storyInfo = "";
var show_list = false;
var toggle = false;
var styleVisible = false;

$(document).ready(function() {
       
         getInfoStory($.urlParam('id'));
    
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
            if(styleVisible){
                $("#style-action").css("visibility","hidden"); 
                styleVisible = false;
            }
		});
        
        $("#wrapper").click(function(){
            if(styleVisible){
                $("#style-action").css("visibility","hidden"); 
                styleVisible = false;
            }
            if(show_list){
                $("#left-menu").animate({left:"-280px"},300,'swing');
                $("#menu-img").animate({left:"0px"},100);
                show_list = false;
            }
        });
        
        $("#set-font").click(function(){
            if(!styleVisible){
                $("#style-action").css("visibility","visible"); 
                styleVisible = true;
            }else{
                $("#style-action").css("visibility","hidden"); 
                styleVisible = false;
            }
        });
        
        $("#font-control").click(function(){
            indexfont++;
            if(indexfont >= lisfontLength)
                indexfont = 0;
            $(this).html(listFont[indexfont].name);
            $("#wrapper").css("font-family",listFont[indexfont].value);
           
        });
    
        $("#small-font").click(function(){
            $("#wrapper").css("font-size","1em");
        });
        $("#large-font").click(function(){
            $("#wrapper").css("font-size","1.5em");
        });
    
        $("#white-background").click(function(){
            $("#wrapper").css("background-color","white");
            $("#wrapper").css("color","black");
        });
        $("#black-background").click(function(){
            $("#wrapper").css("background-color","black");
            $("#wrapper").css("color","white");
        });
        $("#story-background").click(function(){
            $("#wrapper").css("background-color","#dbd9cb");
            $("#wrapper").css("color","#999999");
        });
          
});

function goBack() {
    window.history.back();
};

function downClick() {
    var r = confirm("Bạn muốn tải truyện về máy ?");
    if (r === true) {
        alert("Truyện đang được tải");
    } else {
        alert($.urlParam('id'));
    } 
};

$.urlParam = function(name){
	var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	return results[1] || 0;
};

var listFont = [
    {
        name : 'Georgia',
        value: 'Georgia, serif'},
    {
        name : "Roman",
        value : '"Times New Roman", Times, serif'},
    {
        name : "Arial",
        value : 'Arial, Helvetica, sans-serif'},
    {
        name : "Comic",
        value : '"Comic Sans MS", cursive, sans-serif'},
    
]
    
var lisfontLength = listFont.length;
var indexfont = 0;
    
function getInfoStory(id){
        var url = 'http://webtruyen.com/api3/info?id=' + id;
        $.getJSON( url, {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        })
        .done(function(data) {
            storyInfo = data;
            pushInfo();
        });
    }
function pushInfo(){
     $(".story-name").html(storyInfo.stories[0].name);
     $("#img-page").html('<img src="'+ storyInfo.stories[0].imgurl + '"/>');
     //alert('<img src="'+ storyInfo.stories[0].imgurl + '"/>');
}

function showImagePage(){
    $("#img-page").css("visibility","visible");
    $("#img-page").css("z-index","1");
    $("#wrapper").css("visibility","hidden");
    hideMenu();
}

function hideMenu(){
    $("#left-menu").animate({left:"-280px"},300,'swing');
    $("#menu-img").animate({left:"0px"},100);
    show_list = false;
}


