function executeWidgetCode() {
    require(["UWA/Drivers/jQuery", "DS/PlatformAPI/PlatformAPI"], function($, PlatformAPI) {
        var myWidget = {
            dataFull: [
                { firstName: "John", lastName: "Doe", userId: "JD1" },
                { firstName: "Jane", lastName: "Doe", userId: "JD2" },
                { firstName: "David", lastName: "Doe", userId: "DD1" },
                { firstName: "David", lastName: "Black", userId: "DB1" },
                { firstName: "David", lastName: "White", userId: "DW1" },
                { firstName: "Walter", lastName: "White", userId: "WW1" }
            ],

            topicName: "clicUserId",

            displayData: function(arrData) {
                //Do it properly with jQuery

                var $wdgBody = $(widget.body);
                $wdgBody.empty();

                var $table = $("<table></table>");

                $table.append("<thead><tr><th>First Name</th><th>Last Name</th><th>userId</th></tr></thead>");

                var $tBody = $("<tbody></tbody>");

                for (var i = 0; i < arrData.length; i++) {
                    var $tr = $(
                        "<tr id='" +
                            arrData[i].userId +
                            "' rowSelected='false'><td>" +
                            arrData[i].firstName +
                            "</td><td>" +
                            arrData[i].lastName +
                            "</td><td>" +
                            arrData[i].userId +
                            "</td></tr>"
                    );
                    $tr.on("click", myWidget.clicOnRow);
                    $tBody.append($tr);
                }
                $table.append($tBody);
                $wdgBody.append($table);
            },
            displayDataOldHTML: function(arrData) {
                //HTML as String way to do it :

                var tableHTML = "<table><thead><tr><th>First Name</th><th>Last Name</th><th>userId</th></tr></thead><tbody>";

                for (var i = 0; i < arrData.length; i++) {
                    tableHTML =
                        tableHTML +
                        "<tr id='" +
                        arrData[i].userId +
                        "' rowSelected='false' onclick='widget.myWidget.clicOnRow(this, \"" +
                        arrData[i].userId +
                        "\")'><td>" +
                        arrData[i].firstName +
                        "</td><td>" +
                        arrData[i].lastName +
                        "</td><td>" +
                        arrData[i].userId +
                        "</td></tr>";
                }

                tableHTML += "</tbody></table>";

                widget.body.innerHTML = tableHTML;
            },

            onLoadWidget: function() {
                PlatformAPI.subscribe(myWidget.topicName, myWidget.selectUserRow);

                myWidget.displayData(myWidget.dataFull);
            },

            clicOnRow: function(ev) {
                var elem = this;
                var userIdClicked = elem.id;
                PlatformAPI.publish(myWidget.topicName, { userId: userIdClicked, selected: $(elem).attr("rowSelected") });
            },

            selectUserRow: function(data) {
                //Callback function called when the event happen, is published by any other widget of the dashboard, or our widget itself
                var idClicked = data.userId;
                var wasSelected = data.selected === "true" ? true : false;

                if (wasSelected) {
                    //So we remove the color;
                    $("tr#" + idClicked).css("background-color", "");
                    $("tr#" + idClicked).attr("rowSelected", "false");
                } else {
                    //we set the color
                    $("tr#" + idClicked).css("background-color", "#79D1FB");
                    $("tr#" + idClicked).attr("rowSelected", "true");
                }
            }
        };

        widget.myWidget = myWidget;

        widget.addEvent("onLoad", myWidget.onLoadWidget);
    });
}
