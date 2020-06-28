import content from "./content/index.md"
import data from "./data/counties-10m.json"
import hospitalRanking from "./data/fips-hospital-data.json"

import {
  select,
  geoPath,
  geoAlbersUsa,
  scaleSequential,
  interpolatePuBu,
  zoom,
  event
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

const zoomG = marginG.append('g')
svg.call(zoom().on("zoom", () => {
  zoomG.attr("transform", event.transform)
}))

// get the data
const counties = feature(data, data.objects.counties)
const states = feature(data, data.objects.states)

const projection = geoAlbersUsa()
  .fitSize([innerWidth, innerHeight], counties)
  .translate([innerWidth / 2, innerHeight / 2])

const path = geoPath().projection(projection)

// set color scale
const colorScale = scaleSequential(interpolatePuBu)
  .domain([1, 5])

const fipsInfo = (d) => {
  const hospitals = hospitalRanking[d.id]

  let info = ""
  let avg = "n/a"

  if (hospitals) {
    let sum = 0
    hospitals.forEach(([name, ranking]) => {
      sum += ranking
      info += `${name}: ${ranking}\n`
    })
    avg = sum / hospitals.length
  }

  info = `${d.properties.name} County (avg: ${avg})\n` + info

  return [avg === "n/a" ? "#ccc" : colorScale(avg), info]
}


zoomG.selectAll(".county")
  .data(counties.features)
  .enter().append("path")
    .attr("d", path)
    .attr("class", "county")
    .attr("fill", d => fipsInfo(d)[0])
  .append("title")
    .text(d => fipsInfo(d)[1])

zoomG.selectAll(".state")
  .data(states.features)
  .enter().append("path")
    .attr("d", path)
    .attr("class", "state")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-width", "0.5px")



console.log(data)