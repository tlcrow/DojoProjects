$(document).ready(function(){
    $("#hide").click(function(){
        $("#slashedgraybox h4").hide();
    });

    $( ".show" ).click(function() {
    $( "h4" ).show( "slow" );
    }); 

    $("#graybottomofpicture img").click(function() {
    $( "#graybottomofpicture img" ).before("<p>*</p>");
    }); 

    $("#graybottomofpicture img").click(function() {
    $( "#graybottomofpicture img" ).after("<p>*</p>");
    }); 

    $("#grayportfolio a").click(function() {
    $( "#grayportfolio h5" ).html("<p>-these are all projects-html</p>");
    }); 

    $("#grayheader p").data("phonenumbers", {Instruction: "Don't call us", end: ".data"});
    $( "span:first" ).text( $( "#grayheader p" ).data( "phonenumbers" ).Instruction );
    $( "span:last" ).text( $( "#grayheader p" ).data( "phonenumbers" ).end );

    $("#graybuttons li").first().addClass( "selected" );

    $("input").click(function(){ 
        $("input:text").val("Now Jqueried");
    })

    $("#fadein").click(function(){
    $("#main").fadeIn("slow");
    })

    $("#fadeout").click(function(){
    $("#main").fadeOut("slow");
    })

    $("#toggle").click(function(){
    $("#main").fadeToggle("fast");
    })

    $("#graybuttons p").click(function(){
    $("#graybuttons li").toggle();
    })

    $("#grayfooter a").attr("href", "https://www.google.com");

    $("#slashedgraybox p").text("This is new JQuery text via .text");

    $("#grayportfolio p").append("This is new JQuery Text again by append");

    $("#dancing").click(function(){
        $("#dancing h6").slideToggle( "slow" );
        $("#dancing p").slideToggle( "slow" );
    })
    
    $("#van").click(function(){
        $("#van h6").slideUp( "slow" );
        $("#van p").slideUp( "slow" );
    })
    $("#lovers h5").hide();
    $("#lovers").click(function(){
        $("#lovers h5").slideDown( "slow");
    })
    $("#city").click(function(){
        $("#city h6").slideToggle( "slow" );
        $("#city p").slideToggle( "slow" );
    })
    
})