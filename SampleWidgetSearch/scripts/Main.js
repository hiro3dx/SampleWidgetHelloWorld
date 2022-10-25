function executeWidgetCode() {
    require(["UWA/Drivers/jQuery"], function($) {
        var myWidget = {
            dataFull: [
                {
                    firstName: "John",
                    lastName: "Doe",
                    userId: "JD1"
                },
                {
                    firstName: "Jane",
                    lastName: "Doe",
                    userId: "JD2"
                },
                {
                    firstName: "David",
                    lastName: "Doe",
                    userId: "DD1"
                },
                {
                    firstName: "David",
                    lastName: "Black",
                    userId: "DB1"
                },
                {
                    firstName: "David",
                    lastName: "White",
                    userId: "DW1"
                },
                {
                    firstName: "Walter",
                    lastName: "White",
                    userId: "WW1"
                }
            ],

            displayData: function(arrData) {
                var tableHTML = "<table><thead><tr><th>First Name</th><th>Last Name</th><th>userId</th></tr></thead><tbody>";

                for (var i = 0; i < arrData.length; i++) {
                    tableHTML =
                        tableHTML + "<tr><td>" + arrData[i].firstName + "</td><td>" + arrData[i].lastName + "</td><td>" + arrData[i].userId + "</td></tr>";
                }

                tableHTML += "</tbody></table>";

                widget.body.innerHTML = tableHTML;
            },

            onLoadWidget: function() {
                myWidget.displayData(myWidget.dataFull);
            },

            onSearchWidget: function(searchQuery) {
                var arrResult = [];
                for (var i = 0; i < myWidget.dataFull.length; i++) {
                    var objData = myWidget.dataFull[i];
                    if (objData.firstName.indexOf(searchQuery) !== -1 || objData.lastName.indexOf(searchQuery) !== -1) {
                        arrResult.push(objData);
                    }
                }
                myWidget.displayData(arrResult);
            },

            onResetSearchWidget: function() {
                myWidget.displayData(myWidget.dataFull);
            }
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
        widget.addEvent("onSearch", myWidget.onSearchWidget);
        widget.addEvent("onResetSearch", myWidget.onResetSearchWidget);
    });
}
