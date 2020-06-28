import content from "./content/index.md"
import {
  select
} from "d3"

document.getElementById("main").innerHTML = content;

const svg = select("#us-hospitals")
const width = +svg.attr("width")
const height = +svg.attr("height")

svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "black")