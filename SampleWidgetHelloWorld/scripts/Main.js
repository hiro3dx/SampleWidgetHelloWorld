function executeWidgetCode() {
    require(["UWA/Drivers/jQuery", "HelloModule/Toto"], function($, totoModule) {
        var myWidget = {
            onLoadWidget: function() {
                widget.body.innerHTML = "<p>Hello, World !</p>" + totoModule.fctHello("My Name") + "<br/>" + widget.getValue("UserName");
            },
            toto: "test"
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
    });
}
