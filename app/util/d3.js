import * as d3 from "d3";


const width = window.innerWidth
const height = window.innerHeight
const [centerX, centerY] = [width / 2, height / 2]
const data = [{ "name": "CIRCLE of Friends", radius: 100 }, { "name": "Biol 180", radius: 50 }, { "name": "Writing a Tragedy", radius: 30 }, { name: "Interviewing Middle Easterners", radius: 40 }, { "name": "Outdoors", radius: 70 }, { "name": "Cooking", radius: 50 }, { "name": "Church", radius: 90 }, { "name": "Miscellaneous", radius: 30 }]
const tspans = []
export const isBubbleChartGenerated = { value: false }

function getFontFromRadius(radius) {
    return 0.15 * radius * 2
}

function applyAdhesiveForces(simulation) {
    simulation
        .force(
            "x", d3.forceX()
                .x(centerX)
                .strength(function (d) {
                    const weightX = Math.abs(d.x - centerX) / centerX
                    return 0.05 * weightX ** 2
                })// Attraction to the center of the svg area
        )
        .force(
            "y", d3.forceY()
                .y(centerY)
                .strength(function (d) {
                    const weightY = Math.abs(d.y - centerY) / centerY
                    return 0.05 * weightY ** 2
                })// Attraction to the center of the svg area
        )

    return simulation
}

function boldOnMouseHover(selection) {
    selection
    .on("mouseenter", function (event, d) {
        d3.select(this.parentNode)
        .style("font-weight", 'bold')
        .style("cursor", 'pointer')
    })
    .on("mouseleave", function (event, d) {
        d3.select(this.parentNode)
        .style("font-weight", 'normal')
        .style("cursor", 'pointer')
    })
}



function wrap(texts) {

    // console.log('wrap')
    texts.each(function (txt) {

        const txtNode = d3.select(this)
        const name = String(txt['name'])
        var words = name.split(/\s+/).reverse();
        const font = getFontFromRadius(txt.radius);
        var lineHeight = font;
        var width = txt.radius * 2;

        if (words.length === 1) { //no line skips for single word names
            width += 10000000
        }
        var y = txt['y'];
        var x = txt['x'];
        var anchor = 'middle'


        var tspan = txtNode.text(null).append('tspan').attr('x', x).attr('y', y).attr('text-anchor', anchor);


        const duplicateIndex = tspans.findIndex(({tspan: lineNum, parent }) => parent.name === txt.name && lineNum === 0)
        if (duplicateIndex) {
            delete tspans[duplicateIndex]
        }
        tspans.push({
            tspan,
            lineNum: 0,
            lineHeight,
            parent: txt,
        })

        txt.lineNum = 1

        var lineNumber = 0;
        var line = [];
        var word = words.pop();

        while (word) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {

                lineNumber += 1;
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = txtNode.append('tspan').attr('x', x).attr('y', y + lineNumber * lineHeight).attr('anchor', anchor).text(word);


                tspans.push({
                    tspan,
                    lineNum: lineNumber,
                    lineHeight,
                    parent: txt,
                })

                    
                    txt.lineNum = lineNumber+1 > txt.lineNum ? lineNumber+1 : txt.lineNum


            }
            word = words.pop();
        }
    });
}






export function createFullBubbleChart() {
    const svg = d3.select("#circle-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)


    // create dummy data -> just one element per circle

    // Initialize the circle: all located at the center of the svg area

    let gs = svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")


    let node = gs.append("circle")
        .attr("r", (d) => d.radius)
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill-opacity", 0)
        .attr("stroke", "black")
        .style("stroke-width", 0.5)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))



    const txt = gs
        .append("text")
        .text(d => d.name)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .style("font-size", (d) => {
            const size = getFontFromRadius(d.radius)
            return size + "px"
        })
        .style('width', d => {
            const width = d.radius * 2 + 'px'
        })
        .attr("text-anchor", "middle")


    boldOnMouseHover(node)
    boldOnMouseHover(txt)



    // d3.selectAll('text').call(dotme);




    node.attr("cx", d => d.x)
        .attr("cy", d => d.y)

    const simulation = d3.forceSimulation()
        .nodes(data)
        .force(
            "charge", d3.forceManyBody()
                .strength(20)
        ) // Nodes are attracted one each other of value is > 0
        .force(
            "collide", d3.forceCollide().strength(1)
                .radius(d => d.radius)
                .iterations(1)
        ) // Force that avoids circle overlapping


    applyAdhesiveForces(simulation)


    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .on("tick", function (d) {
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)


            tspans.forEach(({tspan, lineNum, lineHeight, parent }) => {

                const parentH = parent.lineNum * lineHeight
                const h = lineNum * lineHeight
                tspan
                    .attr("x", d => d.x)
                    .attr("y", d => d.y + h + getFontFromRadius(d.radius) - parentH/2)
            })

        });


    // What happens when a circle is dragged?
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {

        applyAdhesiveForces(simulation)
            .alpha(1).restart();

        d.fx = null;
        d.fy = null;
    }



    d3.selectAll('text').call(wrap);



}




// set the dimensions and margins of the graph

// append the svg object to the body of the page









