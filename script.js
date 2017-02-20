    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            "toolManager.hoverDelay": 100,
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
        });

    function tooltipTextConverter(person) {
        var str = "";
        str = person.description;
        return str;
    }

    var tooltiptemplate =
        $(go.Adornment, "Auto",
            $(go.Shape, "Rectangle", { fill: "whitesmoke", stroke: "black" }),
            $(go.TextBlock, {
                    font: "bold 8pt Helvetica, bold Arial, sans-serif",
                    wrap: go.TextBlock.WrapFit,
                    margin: 5
                },
                new go.Binding("text", "", tooltipTextConverter))
        );

    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Auto", { deletable: false, toolTip: tooltiptemplate },
            new go.Binding("text", "name"),
            $(go.Shape, "Rectangle", { strokeWidth: 1, stroke: null, name: "SHAPE" },
                new go.Binding("fill", "color")),
            $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
        );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
        $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = [
        { key: "1", name: "/", color:"blue", description: "Root Directory" },
        { key: "2", parent: "1", color:"blue", name: "assets", description: "To keep assets of the site" },
        { key: "3", parent: "2", color:"blue", name: "Documents", },
        { key: "4", parent: "2", color:"blue", name: "fonts", },
        { key: "5", parent: "2", color:"blue", name: "images", },
        { key: "6", parent: "2", color:"blue", name: "libs", },
        { key: "7", parent: "2", color:"blue", name: "videos", },
        { key: "8", parent: "1", color:"blue", name: "dist", description: "Contains the minified and bundled css and js files for production" },
        { key: "9", parent: "8", color:"blue", name: "css", },
        { key: "10", parent: "8", color:"blue", name: "js", },
        { key: "11", parent: "1", color:"blue", name: "industries", description: "Contains inner pages of industries page" },
        { key: "12", parent: "1", color:"blue", name: "styles", description: "Contains the less files for development" },
        { key: "13", parent: "12", color:"blue", name: "less", },
        { key: "14", parent: "1", color:"blue", name: "scripts", description: "contains the uncompressed js files for development" }
    ];
    myDiagram.model = model;
