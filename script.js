    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            "toolManager.hoverDelay": 100,
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
        });

    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Horizontal", { background: "#DD4814" },
            $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
        );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
        $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = [
        { key: "1", name: "/", },
        { key: "2", parent: "1", name: "assets", },
        { key: "3", parent: "2", name: "Documents", },
        { key: "4", parent: "2", name: "fonts", },
        { key: "5", parent: "2", name: "images", },
        { key: "6", parent: "2", name: "libs", },
        { key: "7", parent: "2", name: "videos", },
        { key: "8", parent: "1", name: "dist", },
        { key: "9", parent: "8", name: "css", },
        { key: "10", parent: "8", name: "js", },
        { key: "11", parent: "1", name: "industries", },
        { key: "12", parent: "1", name: "styles", },
        { key: "13", parent: "12", name: "less", },
    ];
    myDiagram.model = model;
