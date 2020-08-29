$(function(){

    $("#cart-items").slideUp();
    $(".cart").on("click", function () {
    $("#cart-items").slideToggle();
    });

    $("#items-basket").text("(" + ($("#list-item").children().length) + ")");

    
    $(".item").on("click", function () {
  $("#cart-items").slideDown();
 setTimeout(function(){
    $("#cart-items").slideUp();
 }, 2000)
        //add items to basket
        $(this).each(function () {
            var name = $(this).children(".item-detail").children("h4").text();
            var remove = "<button class='remove'> X </button>";
            var cena = "<span class='eachPrice'>" + (parseFloat($(this).children(".item-detail").children(".prices").children(".price").text())) + "</span>";
            $("#list-item").append("<li>" + name + "&#09; - &#09;" + cena + "$" + remove + "</li>");

            //number of items in basket
            $("#items-basket").text("(" + ($("#list-item").children().length) + ")");
            $("#items-basket").text();
    
        //calculate total price
        var totalPrice = 0;
            $(".eachPrice").each(function (){ 
              var cenaEach = parseFloat($(this).text());
              totalPrice+=cenaEach;
            });
            $("#total-price").text(totalPrice + "$");
        });

        //remove items from basket
        $(".remove").on("click", function () {
            $(this).parent().remove();

            var totalPrice = 0;
            $(".eachPrice").each(function (){ 
              var cenaEach = parseFloat($(this).text());
              totalPrice+=cenaEach;
            });
            $("#total-price").text(totalPrice + "$");
            $("#items-basket").text("(" + ($("#list-item").children().length) + ")");
        });
    });
})