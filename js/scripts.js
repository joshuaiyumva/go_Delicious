$(document).ready(function () {


    $("a").click(function (event) {
        event.preventDefault();
    });

    var numOfOrders = 0;
    $(".num").text(numOfOrders);

    $("#thanksMessage, #checkOrderPizza1, #checkOrderPizza2, #checkOrderPizza3, #checkOrderPizza4, #checkOrderPizza5, #checkOrderPizza6,#checkOrderPizza7,#checkOrderPizza8, #finishOrderDialog").hide();
    $("#addToPizza1").click(function () {
        $("#checkOrderPizza1").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    $("#addToPizza2").click(function () {
        $("#checkOrderPizza2").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    $("#addToPizza3").click(function () {
        $("#checkOrderPizza3").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    $("#addToPizza4").click(function () {
        $("#checkOrderPizza4").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    $("#addToPizza5").click(function () {
        $("#checkOrderPizza5").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    $("#addToPizza6").click(function () {
        $("#checkOrderPizza6").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })
    $("#addToPizza7").click(function () {
        $("#checkOrderPizza7").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })
    $("#addToPizza8").click(function () {
        $("#checkOrderPizza8").dialog({
            hide: "blind",
            show: "blind",
            width: "400px",
            closeText: "X"
        });
    })

    function checkboxChange(x) {
        var priceDialog = 0;
        $("#recipe" + x).children("li").children("input").each(function () {
            if ($(this).is(":checked")) {
                priceDialog += 3;
            }
            $("#totalDialog" + x + ">span").text(priceDialog);
            $(this).change(function () {
                if ($(this).is(":checked")) {
                    priceDialog += 3;
                    console.log(priceDialog);
                    $("#totalDialog" + x + ">span").text(priceDialog);
                } else {
                    priceDialog -= 3;
                    $("#totalDialog" + x + ">span").text(priceDialog);
                }
            })
        });
    }

    $('#recipe1').children('li').click(checkboxChange(1));
    $('#recipe2').children('li').click(checkboxChange(2));
    $('#recipe3').children('li').click(checkboxChange(3));
    $('#recipe4').children('li').click(checkboxChange(4));
    $('#recipe5').children('li').click(checkboxChange(5));
    $('#recipe6').children('li').click(checkboxChange(6));
    $('#recipe7').children('li').click(checkboxChange(7));
    $('#recipe8').children('li').click(checkboxChange(8));

    $(".addIngredient").click(function () {
        var inputIng = '<input type="text" id="newIngredient">';
        var confirmInput = '<a class="btnStyle3 btnStyle confirmInput">&#10004;</a>';
        var cancelInput = '<a class="btnStyle3 btnStyle cancelInput">&#10008;</a>';
        var inputWrap = '<div class="addIngredientWrap">' + inputIng + confirmInput + cancelInput + '</div>'
        $(this).parent().children("ul").after(inputWrap);
        $("#newIngredient").focus();
        $("#newIngredient").attr("placeholder", "separate ingredients with a comma");

        $(".addIngredientWrap > .confirmInput").click(function () {
            if ($("#newIngredient").val() != "") {
                var newIngredient = ($(".addIngredientWrap input").val()).split(",");
                var newCheckbox = '<input type="checkbox" checked>';

                for (var i = 0; i < newIngredient.length; i++) {
                    $(this).parent().siblings("ul").append("<li>" + newCheckbox + newIngredient[i] + "  (+3$)</li>");
                }


                $('#recipe1').children('li').click(checkboxChange(1));
                $('#recipe2').children('li').click(checkboxChange(2));
                $('#recipe3').children('li').click(checkboxChange(3));
                $('#recipe4').children('li').click(checkboxChange(4));
                $('#recipe5').children('li').click(checkboxChange(5));
                $('#recipe6').children('li').click(checkboxChange(6));
                $('#recipe7').children('li').click(checkboxChange(7));
                $('#recipe8').children('li').click(checkboxChange(8));

                $(this).parent().remove();
            } else {
                $("#newIngredient").attr("placeholder", "Please add ingrediant");
            }
        });
        $(".addIngredientWrap > .cancelInput").click(function () {
            $(this).parent().remove();
        })
    })
    $(".listOver").click(function () {
        var orderName = '<h3 class="orderName"><span>' + $(this).parent().siblings(".ui-dialog-titlebar").children("span").text() + '</span><a class="delBtn">&#10008;</a>' + '</h3>';
        var orderIngredients = '<ul class="orderIngredients"></ul>';
        var orderPrice = '<h3 class="orderPrice"><span>' + $(this).parent().children(".totalDialog").children("span").text() + '</span>$<h3>'
        var horisontalLine = '<hr>';
        $(".cart").children("#listOfOrders").append("<li>" + orderName + orderIngredients + orderPrice + horisontalLine + "</li>");

        $(this).parent().children("ul").children().children("input:checked").each(function () {
            var selectedIngredient = $(this).parent().text();
            $(".orderIngredients").last().append("<li>" + selectedIngredient + "</li>");
        })

        if ($('#cartToggle').prop('checked')) {
            $("#cartToggle").prop("checked", true);
        } else {
            $("#cartToggle").prop("checked", true);
        }

        $(this).parent(".ui-dialog-content").dialog("close");

        numOfOrders = $("#listOfOrders").children().length;
        $(".num").text(numOfOrders);
        var totalOrderPrice = 0;
        $("#listOfOrders").children("li").children(".orderPrice").children("span").each(function () {
            var price = parseFloat($(this).text());
            totalOrderPrice += price;
            $(".cart > h3 > span").text(totalOrderPrice + "$");
        });

        $(".delBtn").click(function () {
            var removePrice = $(this).parent().parent().children(".orderPrice").children("span").text();
            totalOrderPrice -= removePrice;
            $(".cart > h3 > span").text(totalOrderPrice + "$");

            $(this).parents("li").remove();
            numOfOrders = $("#listOfOrders").children().length;
            $(".num").text(numOfOrders);
        })
    }); 
    $(".finishOrder").click(function () {
        $("#finalOrderList > ol").children().remove();
        $(".orderName").children("span").each(function () {
            var finalOrder = '<li>' + $(this).text() + '</li>';
            $("#finalOrderList > ol").append(finalOrder);
        })

        $("#finishOrderDialog").dialog({
            hide: "blind",
            show: "blind",
            width: "500px",
            closeText: "X"
        });
    })

    $(".order").click(function () {
        var name = $("#buyerName").val();
        var number = $("#buyerNumber").val();
        var address = $("#buyerAddress").val();

        if (name != "" && number != "" && address != "") {
            $("#finishOrderDialog").dialog("close");
            $("#buyerInfo").children("p").remove();
            $("#thanksMessage").dialog({
                hide: "blind",
                show: "blind",
                width: "400px"
            });
            setTimeout(function () {
                $("#thanksMessage").dialog("close");
            }, 3000);
        } else {
            $("#buyerInfo").append('<p>Fill up all the inputs</p>');
        }
    })

})