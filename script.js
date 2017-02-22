    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            "toolManager.hoverDelay": 100,
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
        });
    var folderColor = "grey";
    var fileColor = "blue";
    myDiagram.add(
        $(go.Part, "Table", { position: new go.Point(200, -100), selectable: false },
            $(go.TextBlock, "Key", { row: 0, font: "700 14px Droid Serif, sans-serif" }), // end row 0
            $(go.Panel, "Horizontal", { row: 1, alignment: go.Spot.Left },
                $(go.Shape, "Rectangle", { desiredSize: new go.Size(30, 30), fill: folderColor, margin: 5 }),
                $(go.TextBlock, "Folder", { font: "700 13px Droid Serif, sans-serif" })
            ), // end row 1
            $(go.Panel, "Horizontal", { row: 2, alignment: go.Spot.Left },
                $(go.Shape, "Rectangle", { desiredSize: new go.Size(30, 30), fill: fileColor, margin: 5 }),
                $(go.TextBlock, "File", { font: "700 13px Droid Serif, sans-serif" })
            ) // end row 2
        ));

    function tooltipTextConverter(data) {
        var str = "";
        str = data.description;
        return str;
    }

    var tooltiptemplate =
        $(go.Adornment, "Auto",
            $(go.Shape, "Rectangle", { fill: "whitesmoke", stroke: "black" }),
            $(go.TextBlock, {
                    font: "bold 14px Helvetica, bold Arial, sans-serif",
                    wrap: go.TextBlock.WrapFit,
                    margin: 5
                },
                new go.Binding("text", "", tooltipTextConverter))
        );

    function color(type) {
        if (type === "folder") return folderColor;
        if (type === "file") return fileColor;
        if (type === "Root") return "Black";
    }
    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Auto", { deletable: false, toolTip: tooltiptemplate},
            new go.Binding("text", "name"),
            $(go.Shape, "RoundedRectangle",
                new go.Binding("fill", "type", color)),
            $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
            // $("TreeExpanderButton", {
            //     alignmentFocus: go.Spot.Center,
            //     alignment: go.Spot.TopRight
            // })

        );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
        $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = [
        { key: "1", name: "/", type: "Root", description: "Root Directory. Contains main html files" },
        { key: "2", parent: "1", type: "folder", name: "assets", description: "To keep assets of the site" },
        { key: "3", parent: "2", type: "folder", name: "Documents", description: "Contains seemymachines docs" },
        { key: "4", parent: "2", type: "folder", name: "fonts", description: "Fonts used in site" },
        { key: "5", parent: "2", type: "folder", name: "images", description: "images used in site" },
        { key: "6", parent: "2", type: "folder", name: "libs", description: "Libraries used in site" },
        { key: "7", parent: "2", type: "folder", name: "videos", description: "Videos used in site" },
        { key: "8", parent: "1", type: "folder", name: "dist", description: "Contains the minified and bundled css and js files for production" },
        { key: "9", parent: "8", type: "folder", name: "css", },
        { key: "10", parent: "8", type: "folder", name: "js", },
        { key: "11", parent: "1", type: "folder", name: "industries", description: "Contains inner pages of industries page" },
        { key: "12", parent: "1", type: "folder", name: "styles", description: "Contains the less files for development" },
        { key: "13", parent: "12", type: "folder", name: "less", description: "Contains main and common less files" },
        { key: "14", parent: "1", type: "folder", name: "scripts", description: "contains the uncompressed js files for development" },
        { key: "15", parent: "1", type: "file", name: "index.html", description: "Home page" },
        { key: "16", parent: "1", type: "file", name: "...", description: "Other html files" },
        { key: "17", parent: "3", type: "file", name: "SeeMyMachine-Brochure.pdf", description: "Brochure" },
        { key: "18", parent: "4", type: "folder", name: "Helvetica", description: "Helvetica Fonts" },
        { key: "19", parent: "4", type: "folder", name: "OpenSans", description: "OpenSans Fonts" },
        { key: "20", parent: "13", type: "folder", name: "Common", description: "Common Less files" },
        { key: "21", parent: "13", type: "file", name: "home.less", description: "Less file for home page" },
        { key: "22", parent: "13", type: "file", name: "...", description: "Other Less files" },
        { key: "23", parent: "6", type: "file", name: "jquery-3.1.1.min.js", description: "jquery script" },
        { key: "24", parent: "14", type: "file", name: "home.js", description: "js for home page" },
        { key: "25", parent: "11", type: "file", name: "renewable-energy.html", description: "html for renewable energy page" },
        { key: "26", parent: "7", type: "file", name: "bannervideo.mp4", description: "homepage video" },


    ];
    myDiagram.model = model;
    myDiagram.addDiagramListener("ObjectSingleClicked",
        function(e) {
            var part = e.subject.part;
            console.log(part.data.description)
        });
