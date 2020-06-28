import content from "./content/index.md"
import data from "./data/counties-10m.json"
import {
  select,
  geoPath,
  geoAlbersUsa
} from "d3"
import { feature } from "topojson"
import "./styles/main.scss"

document.getElementById("main").innerHTML = content

const svg = select("#us-hospitals")
const width = +svg.attr("width")
const height = +svg.attr("height")

// obey the margin convention
const margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const marginG = svg.append('g')
  .attr("width", innerWidth)
  .attr("height", innerHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// get the data
const counties = feature(data, data.objects.counties)

const projection = geoAlbersUsa()
  .fitSize([innerWidth, innerHeight], counties)
  .translate([innerWidth / 2, innerHeight / 2])

const path = geoPath().projection(projection)

marginG.selectAll(".region")
  .data(counties.features)
  .enter().append("path")
    .attr("d", path)
    .attr("class", "region")
    .attr("fill", "#e9e9e9")
    .attr("stroke", "none")

console.log(data)