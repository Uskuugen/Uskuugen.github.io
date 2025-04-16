<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Combined Visualizations</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
  <script src="https://d3js.org/d3-geo-projection.v2.min.js"></script>
  <style>
    .tooltip {
      position: absolute;
      background-color: black;
      color: white;
      padding: 10px;
      border-radius: 5px;
      pointer-events: none;
      opacity: 0;
    }
  </style>
</head>
<body>
  <!-- Tooltip -->
  <div id="tooltip" class="tooltip"></div>

  <!-- Visualization Containers -->
  <div>
    <h2>Bubble Graph</h2>
    <div id="bubble-container"></div>
  </div>

  <div>
    <h2>Choropleth Map</h2>
    <svg id="map-container" width="600" height="400"></svg>
  </div>

  <script>
    // Shared Tooltip Logic
    const tooltip = d3.select("#tooltip");

    const showTooltip = (event, content) => {
      tooltip.style("opacity", 1)
        .html(content)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    };

    const moveTooltip = (event) => {
      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    };

    const hideTooltip = () => {
      tooltip.style("opacity", 0);
    };

    // Bubble Graph
    const renderBubbleGraph = () => {
      const margin = { top: 10, right: 20, bottom: 30, left: 50 },
            width = 500 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

      const svg = d3.select("#bubble-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      d3.csv("https://raw.githubusercontent.com/Uskuugen/Uskuugen.github.io/refs/heads/main/Bubble.csv")
        .then(data => {
          data.forEach(d => {
            d.medals = +d.medals;
            d.population = +d.population;
          });

          // Scales
          const x = d3.scaleLinear()
            .domain([1, 3000])
            .range([0, width]);
          const y = d3.scaleLinear()
            .domain([0, 1500000000])
            .range([height, 0]);
          const z = d3.scaleLinear()
            .domain([1, 3000])
            .range([4, 40]);
          const color = d3.scaleOrdinal()
            .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
            .range(d3.schemeSet2);

          // Axes
          svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
          svg.append("g").call(d3.axisLeft(y));

          // Bubbles
          svg.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.medals))
            .attr("cy", d => y(d.population))
            .attr("r", d => z(d.medals))
            .style("fill", d => color(d.continent))
            .on("mouseover", (event, d) => {
              showTooltip(event, `Country: ${d.country}<br>Medals: ${d.medals}<br>Population: ${d.population}`);
            })
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip);
        });
    };

    // Choropleth Map
    const renderChoroplethMap = () => {
      const width = 600, height = 400;

      const svg = d3.select("#map-container");

      const projection = d3.geoMercator()
        .scale(100)
        .center([20, 0])
        .translate([width / 2, height / 2]);

      const data = new Map();
      const colorScale = d3.scaleThreshold()
        .domain([0, 1, 10, 50, 100, 500, 1000, 1500, 2000])
        .range(d3.schemeBlues[9]);

      Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
        d3.csv("https://raw.githubusercontent.com/Uskuugen/Uskuugen.github.io/refs/heads/main/world.csv", d => {
          data.set(d.code, +d.medals);
        })
      ]).then(([geojson]) => {
        svg.selectAll("path")
          .data(geojson.features)
          .join("path")
          .attr("d", d3.geoPath().projection(projection))
          .attr("fill", d => {
            const value = data.get(d.id) || 0;
            return colorScale(value);
          })
          .style("stroke", "transparent")
          .style("opacity", 0.8)
          .on("mouseover", (event, d) => {
            const value = data.get(d.id) || 0;
            showTooltip(event, `Country: ${d.properties.name}<br>Medals: ${value}`);
          })
          .on("mousemove", moveTooltip)
          .on("mouseleave", hideTooltip);
      });
    };

    // Render Visualizations
    renderBubbleGraph();
    renderChoroplethMap();
  </script>
</body>
</html>
