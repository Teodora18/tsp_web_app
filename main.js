// import Map from 'https://cdn.jsdelivr.net/npm/ol@latest/Map.js';
// import OSM from 'https://cdn.jsdelivr.net/npm/ol@latest/source/OSM.js';

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { Tooltip } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "ol/ol.css";
import "./style.css";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Point from "ol/geom/Point.js";
import LineString from "ol/geom/LineString.js";
import Feature from "ol/Feature.js";
import { fromLonLat } from "ol/proj.js";
import { Circle, Fill, Stroke, Style } from "ol/style.js";
import Icon from "ol/style/Icon.js";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";
import Modify from "ol/interaction/Modify";
import Collection from "ol/Collection.js";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import { pointerMove } from "ol/events/condition";
import Text from "ol/style/Text.js";

window.addEventListener("DOMContentLoaded", () => {
  const welcomeModal = new Modal(document.getElementById("welcomeModal"));
  welcomeModal.show();
});

const view = new View({
  center: [2604941.43828, 5260974.341612],
  zoom: 15,
});

const osmMap = new TileLayer({
  title: "OSM",
  visible: true,
  source: new OSM(),
});

const baseLayerGroup = new LayerGroup({
  layers: [osmMap],
});

const druzhbaBorder = new VectorLayer({
  source: new VectorSource({
    url: "./data/druzhba_1_borders.geojson",
    format: new GeoJSON(),
  }),
  style: new Style({
    stroke: new Stroke({ color: "#FF0000", width: 3 }),
  }),
});

const pedestrianSource = new VectorSource();

pedestrianSource.on("change", () => {
  const updatedFeatures = pedestrianSource.getFeatures();
  buildGraph(updatedFeatures);
});

const pedestrianNetwork = new VectorLayer({
  source: pedestrianSource,
  visible: false,
  style: new Style({
    stroke: new Stroke({ color: "#aaa", width: 2 }),
  }),
});

const pedestrianNetworksData = {};

Promise.all([
  fetch("./data/pedestrian_network_druzhba1_densified1.geojson").then((res) =>
    res.json(),
  ),
  fetch("./data/pedestrian_network_druzhba1_densified_osm.geojson").then(
    (res) => res.json(),
  ),
]).then(([data1, data2]) => {
  pedestrianNetworksData["network1"] = data1;
  pedestrianNetworksData["network2"] = data2;

  // Load initial network
  loadPedestrianNetwork("network1");
});

const interactionRegistry = {};

function loadPedestrianNetwork(networkKey) {
  const tbody = document.querySelector("#pedestrian-attributeTable tbody");
  if (tbody) {
    tbody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("selected-row"));
  }

  const warning = document.getElementById("pedestrian-selectedFeatureWarning");
  if (warning) {
    warning.style.display = "none";
  }

  const clearBtn = document.getElementById("pedestrian-clearSelectionBtn");
  if (clearBtn) {
    clearBtn.disabled = true;
  }

  const modifyBtn = document.getElementById("pedestrian-modifyGeometryBtn");
  if (modifyBtn) {
    modifyBtn.disabled = true;
  }

  const deleteBtn = document.getElementById("pedestrian-deleteFeatureBtn");
  if (deleteBtn) {
    deleteBtn.disabled = true;
  }

  const toggleEditBtn = document.getElementById("pedestrian-toggleEditBtn");
  if (toggleEditBtn) {
    toggleEditBtn.textContent = "✏️";
  }

  const downloadBtn = document.getElementById("pedestrian-downloadGeoJSONBtn");
  if (downloadBtn) {
    downloadBtn.disabled = true; // disable until user saves new edits
  }

  if (window._layerManagers?.["pedestrian"]) {
    const select = window._layerManagers["pedestrian"].select;
    if (select) select.getFeatures().clear();

    if (window._layerManagers["pedestrian"].cleanup) {
      window._layerManagers["pedestrian"].cleanup();
    }
  }

  window._layerManagers["pedestrian"] = {};
  const geojson = pedestrianNetworksData[networkKey];
  if (!geojson) return;

  pedestrianSource.clear();
  const features = new GeoJSON().readFeatures(geojson);
  pedestrianSource.addFeatures(features);
  buildGraph(features); // Update graph for routing

  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
  tspCalculated = false;
  // Determine which attribute to use as filter
  const dropdownField = networkKey === "network1" ? "type" : "highway";

  // Rebuild attribute table with correct filter
  setupLayerWithFullUI({
    map,
    layer: pedestrianNetwork,
    source: pedestrianSource,
    layerId: "pedestrian",
    options: {
      enableDrawing: true,
      geometryType: "LineString",
      filterDropdownField: dropdownField,
    },
  });
}

document.getElementById("networkSelect").addEventListener("change", (e) => {
  const selectedKey = e.target.value;
  loadPedestrianNetwork(selectedKey);
});

const pointSource = new VectorSource();
const pointLayer = new VectorLayer({ source: pointSource });

let routeLayer = null;

const staticGroup = new LayerGroup({
  layers: [druzhbaBorder, pedestrianNetwork],
});

const map = new Map({
  target: "map",
  layers: [baseLayerGroup, staticGroup, pointLayer],
  view: view,
});

let graph = {};
let nodeMap = [];
let points = [];
let pointFeatures = [];
let lastRouteCoords = [];
let tspCalculated = false;

function coordKey(coords) {
  return coords[0].toFixed(6) + "," + coords[1].toFixed(6);
}

function euclideanDistance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function buildGraph(features) {
  graph = {};
  nodeMap = [];
  for (const feature of features) {
    const geom = feature.getGeometry();
    const multiLineCoords =
      geom.getType() === "MultiLineString"
        ? geom.getCoordinates()
        : [geom.getCoordinates()];
    for (const line of multiLineCoords) {
      for (let i = 0; i < line.length - 1; i++) {
        const a = line[i];
        const b = line[i + 1];
        const ka = coordKey(a);
        const kb = coordKey(b);
        if (!graph[ka]) {
          graph[ka] = [];
          nodeMap.push({ coord: a, key: ka });
        }
        if (!graph[kb]) {
          graph[kb] = [];
          nodeMap.push({ coord: b, key: kb });
        }
        const dist = euclideanDistance(a, b);
        graph[ka].push({ node: kb, weight: dist });
        graph[kb].push({ node: ka, weight: dist });
      }
    }
  }
}

function findNearestNode(coord) {
  let minDist = Infinity;
  let nearest = null;
  for (const n of nodeMap) {
    const d = euclideanDistance(coord, n.coord);
    if (d < minDist) {
      minDist = d;
      nearest = n;
    }
  }
  return nearest;
}

function dijkstra(startKey, avoidKeys = new Set()) {
  const dist = {};
  const prev = {};
  const unvisitedNodes = new Set();

  for (const node of Object.keys(graph)) {
    if (avoidKeys.has(node)) continue;
    dist[node] = Infinity;
    unvisitedNodes.add(node);
  }

  // If startKey is in avoidKeys, return empty path to avoid freeze
  if (!dist.hasOwnProperty(startKey)) return { dist: {}, prev: {} };

  dist[startKey] = 0;

  while (unvisitedNodes.size) {
    let u = null;
    let minDist = Infinity;
    for (const node of unvisitedNodes) {
      if (dist[node] < minDist) {
        minDist = dist[node];
        u = node;
      }
    }
    if (!u) break;

    unvisitedNodes.delete(u);

    for (const neighbor of graph[u]) {
      if (avoidKeys.has(neighbor.node)) continue;
      const alt = dist[u] + neighbor.weight;
      if (alt < dist[neighbor.node]) {
        dist[neighbor.node] = alt;
        prev[neighbor.node] = u;
      }
    }
  }

  return { dist, prev };
}

function reconstructPath(prev, endKey) {
  const path = [];
  let current = endKey;
  while (current && prev[current]) {
    path.unshift(current);
    current = prev[current];
  }
  if (current) path.unshift(current);
  return path.map((k) => nodeMap.find((n) => n.key === k).coord);
}

function tspRoadBasedRoute(points) {
  const matrix = [];
  const paths = {};
  for (let i = 0; i < points.length; i++) {
    const from = points[i];
    const { dist, prev } = dijkstra(from.snapKey);
    matrix[i] = [];
    for (let j = 0; j < points.length; j++) {
      const to = points[j];
      matrix[i][j] = dist[to.snapKey];
      paths[`${i}-${j}`] = reconstructPath(prev, to.snapKey);
    }
  }
  const visited = new Set();
  const routeOrder = [0];
  visited.add(0);
  let current = 0;
  while (visited.size < points.length) {
    let next = -1;
    let minDist = Infinity;
    for (let j = 0; j < points.length; j++) {
      if (!visited.has(j) && matrix[current][j] < minDist) {
        minDist = matrix[current][j];
        next = j;
      }
    }
    if (next !== -1) {
      routeOrder.push(next);
      visited.add(next);
      current = next;
    }
  }

  let fullPath = [];
  for (let i = 0; i < routeOrder.length - 1; i++) {
    const a = routeOrder[i];
    const b = routeOrder[i + 1];
    const path = paths[`${a}-${b}`];
    fullPath = fullPath.concat(path.slice(1));
  }

  const last = routeOrder[routeOrder.length - 1];
  const first = routeOrder[0];

  const avoidKeys = new Set(points.map((p) => p.snapKey));
  avoidKeys.delete(points[last].snapKey);
  avoidKeys.delete(points[first].snapKey);

  const { prev } = dijkstra(points[last].snapKey, avoidKeys);
  const returnPath = reconstructPath(prev, points[first].snapKey);
  if (returnPath && returnPath.length > 1) {
    fullPath = fullPath.concat(returnPath.slice(1));
  }
  return fullPath;
}

function drawRoute(coords) {
  lastRouteCoords = coords;
  // Remove previous route if it exists
  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  // Calculate total distance
  const distance = coords.reduce((sum, curr, i, arr) => {
    if (i === 0) return 0;
    return sum + euclideanDistance(arr[i - 1], curr);
  }, 0);

  const feature = new Feature({
    geometry: new LineString(coords),
    name: "Маршрут",
    distance_m: Math.round(distance),
    created_at: new Date().toISOString(),
  });
  const source = new VectorSource({ features: [feature] });
  routeLayer = new VectorLayer({
    source,
    style: new Style({
      stroke: new Stroke({ color: "#0048ff", width: 3 }),
    }),
  });
  map.addLayer(routeLayer);

  layerMap.routeLayer = routeLayer;

  setupLayerWithFullUI({
    map,
    layer: routeLayer,
    source: routeLayer.getSource(),
    layerId: "route",
  });
}

function updateRouteDistance(feature) {
  const geometry = feature.getGeometry();
  if (!geometry || geometry.getType() !== "LineString") return;

  const coords = geometry.getCoordinates();
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    const dx = coords[i][0] - coords[i - 1][0];
    const dy = coords[i][1] - coords[i - 1][1];
    total += Math.sqrt(dx * dx + dy * dy);
  }

  const distanceMeters = Math.round(total);
  feature.set("distance_m", distanceMeters);
}

function syncPointsIfChanged() {
  const currentFeatures = pointLayer.getSource().getFeatures();

  // Check if number of features has changed (added or deleted)
  if (currentFeatures.length !== pointFeatures.length) {
    updatePoints(currentFeatures);
    return true;
  }

  // Check if any features are moved
  for (let i = 0; i < currentFeatures.length; i++) {
    const feature = currentFeatures[i];
    const lastCoord = feature.get("__lastCoord");
    const currentCoord = feature.getGeometry().getCoordinates();

    if (
      !lastCoord ||
      currentCoord[0] !== lastCoord[0] ||
      currentCoord[1] !== lastCoord[1]
    ) {
      updatePoints(currentFeatures);
      return true;
    }
  }

  return false;
}

function updatePoints(currentFeatures) {
  pointFeatures = [...currentFeatures];
  points = currentFeatures.map((feature) => {
    const coord = feature.getGeometry().getCoordinates();
    const nearest = findNearestNode(coord);
    return {
      clicked: coord,
      snapKey: nearest.key,
    };
  });
}

function calculateTSP() {
  const changed = syncPointsIfChanged();

  if (points.length >= 2) {
    const route = tspRoadBasedRoute(points);
    drawRoute(route);

    const routeOrder = [];
    const used = new Set();
    let current = 0;
    routeOrder.push(current);
    used.add(current);

    const matrix = [];

    for (let i = 0; i < points.length; i++) {
      const { dist } = dijkstra(points[i].snapKey);
      matrix[i] = [];
      for (let j = 0; j < points.length; j++) {
        matrix[i][j] = dist[points[j].snapKey];
      }
    }

    while (routeOrder.length < points.length) {
      let minDist = Infinity;
      let next = null;
      for (let j = 0; j < points.length; j++) {
        if (!used.has(j) && matrix[current][j] < minDist) {
          minDist = matrix[current][j];
          next = j;
        }
      }
      if (next !== null) {
        routeOrder.push(next);
        used.add(next);
        current = next;
      }
      document.getElementById("poiLayer").disabled = false;
      document.getElementById("points-openAttributesBtn").disabled = false;
      document.getElementById("points-toggleSelectBtn").disabled = false;
      document.getElementById("exportPOIBtn").disabled = false;
      document.getElementById("routeLayer").disabled = false;
      document.getElementById("route-openAttributesBtn").disabled = false;
      document.getElementById("route-toggleSelectBtn").disabled = false;
      document.getElementById("exportRouteBtn").disabled = false;
    }

    for (let i = 0; i < routeOrder.length; i++) {
      const idx = routeOrder[i];
      const feature = pointFeatures[idx];
      feature.set("route_order", i + 1);
    }
    tspCalculated = true;
  } else {
    alert("Моля, добавете поне две точки.");
  }
}

function resetApp() {
  points = [];
  lastRouteCoords = [];
  pointFeatures.forEach((f) => pointSource.removeFeature(f));
  pointFeatures = [];
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }

  tspCalculated = false;
  document.getElementById("poiLayer").disabled = true;
  document.getElementById("points-openAttributesBtn").disabled = true;
  document.getElementById("points-toggleSelectBtn").disabled = true;
  document.getElementById("exportPOIBtn").disabled = true;
  document.getElementById("routeLayer").disabled = true;
  document.getElementById("route-openAttributesBtn").disabled = true;
  document.getElementById("route-toggleSelectBtn").disabled = true;
  document.getElementById("exportRouteBtn").disabled = true;
}

function undoLastPoint() {
  if (points.length > 0) {
    points.pop();
    const f = pointFeatures.pop();
    pointSource.removeFeature(f);
    if (routeLayer) map.removeLayer(routeLayer);
  }
}

let isDrawing = false;
let drawingLocked = false;
let isModifying = false;
let mapSelectionEnabled = false;

function setupLayerWithFullUI({ map, layer, source, layerId, options = {} }) {
  if (window._layerManagers?.[layerId]?.cleanup) {
    window._layerManagers[layerId].cleanup();
  }
  const {
    enableDrawing = false,
    geometryType = "LineString",
    filterDropdownField = null,
  } = options;

  let previouslyHighlighted = null;
  let selectedFeatureId = null;
  let editingEnabled = false;
  let newFeature = null;
  let drawInteraction = null;
  let modifyInteraction = null;
  let snapInteraction = null;
  let originalGeometry = null;
  const originalFeatureData = new Map();
  let shouldScrollToSelectedRow = false;
  let fields = [];
  let attributeChangesMade = false;
  let fieldTypes = {};

  if (interactionRegistry[layerId]) {
    interactionRegistry[layerId].cleanup?.();
    delete interactionRegistry[layerId];
  }

  function getHighlightStyle(feature) {
    const geomType = feature.getGeometry().getType();

    if (geomType === "Point") {
      return new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: "#FFFF00" }),
          stroke: new Stroke({ color: "#000", width: 2 }),
        }),
      });
    } else if (
      geomType === "LineString" ||
      geomType === "MultiLineString" ||
      geomType === "Polygon" ||
      geomType === "MultiPolygon"
    ) {
      return new Style({
        stroke: new Stroke({
          color: "#FFFF00",
          width: 5,
        }),
      });
    }

    return null;
  }

  const selectInteraction = new Select({
    condition: click,
    layers: [layer],
    style: getHighlightStyle,
  });

  const hoverInteraction = new Select({
    condition: pointerMove,
    layers: [layer],
    style: (feature) => {
      const geomType = feature.getGeometry().getType();

      if (geomType === "Point") {
        return new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: "#00FFFF" }),
            stroke: new Stroke({ color: "#000", width: 2 }),
          }),
        });
      } else if (
        geomType === "LineString" ||
        geomType === "MultiLineString" ||
        geomType === "Polygon" ||
        geomType === "MultiPolygon"
      ) {
        return new Style({
          stroke: new Stroke({
            color: "#00FFFF",
            width: 4,
          }),
        });
      }

      return null;
    },
  });

  let toggleSelectBtn = document.getElementById(`${layerId}-toggleSelectBtn`);
  const clonedBtn = toggleSelectBtn.cloneNode(true);
  toggleSelectBtn.parentNode.replaceChild(clonedBtn, toggleSelectBtn);
  toggleSelectBtn = clonedBtn; // Update reference

  toggleSelectBtn.addEventListener("click", () => {
    if (mapSelectionEnabled) {
      map.removeInteraction(selectInteraction);
      map.removeInteraction(hoverInteraction);
      toggleSelectBtn.textContent = "Селекция по картата";
      mapSelectionEnabled = false;

      if (previouslyHighlighted) {
        previouslyHighlighted.setStyle(null);
        previouslyHighlighted = null;
      }

      if (selectedFeatureId) {
        const feature = source
          .getFeatures()
          .find((f) => f.ol_uid === selectedFeatureId);
        if (feature) {
          feature.setStyle(getHighlightStyle);
          previouslyHighlighted = feature;
        }
      }
    } else {
      map.addInteraction(selectInteraction);
      map.addInteraction(hoverInteraction);
      toggleSelectBtn.textContent = "Изключи селекция по картата";
      mapSelectionEnabled = true;

      if (selectedFeatureId) {
        const feature = source
          .getFeatures()
          .find((f) => f.ol_uid === selectedFeatureId);
        if (feature) {
          selectInteraction.getFeatures().clear();
          selectInteraction.getFeatures().push(feature);
        }
      }
    }
  });

  function selectFeatureAndRow(feature) {
    if (previouslyHighlighted) previouslyHighlighted.setStyle(null);

    if (feature) {
      feature.setStyle(getHighlightStyle);
      previouslyHighlighted = feature;

      const extent = feature.getGeometry().getExtent();
      map
        .getView()
        .fit(extent, { duration: 300, padding: [50, 50, 50, 50], maxZoom: 18 });
    }

    selectedFeatureId = feature?.ol_uid;
    shouldScrollToSelectedRow = true;

    document
      .querySelectorAll(`#${layerId}-attributeTable tbody tr`)
      .forEach((r) => {
        r.classList.remove("selected-row");
        if (r.dataset.featureId === selectedFeatureId) {
          r.classList.add("selected-row");
          r.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });

    document.getElementById(`${layerId}-selectedFeatureWarning`).style.display =
      feature ? "block" : "none";
    deleteBtn.disabled = !feature;
    modifyGeometryBtn.disabled = !feature;
    clearSelectionBtn.disabled = false;
  }

  selectInteraction.on("select", (e) => {
    const feature = e.selected[0];
    if (editingEnabled) {
      selectInteraction.getFeatures().clear();
      return;
    }
    selectFeatureAndRow(feature);
  });

  // Clear selection logic
  let clearSelectionBtn = document.getElementById(
    `${layerId}-clearSelectionBtn`,
  );
  const clonedClearBtn = clearSelectionBtn.cloneNode(true);
  clearSelectionBtn.parentNode.replaceChild(clonedClearBtn, clearSelectionBtn);
  clearSelectionBtn = clonedClearBtn;
  clearSelectionBtn.addEventListener("click", () => {
    if (previouslyHighlighted) {
      previouslyHighlighted.setStyle(null);
      previouslyHighlighted = null;
    }
    selectedFeatureId = null;
    selectInteraction.getFeatures().clear();
    document
      .querySelectorAll(`#${layerId}-attributeTable tbody tr`)
      .forEach((r) => r.classList.remove("selected-row"));

    document.getElementById(`${layerId}-selectedFeatureWarning`).style.display =
      "none";
    deleteBtn.disabled = true;
    modifyGeometryBtn.disabled = true;
    clearSelectionBtn.disabled = true;

    if (isModifying) {
      map.removeInteraction(modifyInteraction);
      map.removeInteraction(snapInteraction);
      modifyInteraction = null;
      snapInteraction = null;
      isModifying = false;
      modifyGeometryBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    }
  });

  // Attribute table builder
  function buildAttributeTable() {
    const features = source.getFeatures();
    if (!features.length) {
      alert("Няма заредени обекти.");
      return;
    }

    const properties = features[0].getProperties();
    delete properties.geometry;
    fields = Object.keys(properties);

    const layerProps = features[0].getProperties();
    for (const field of fields) {
      const value = layerProps[field];
      fieldTypes[field] = typeof value;
    }

    const headerRow = document.getElementById(`${layerId}-attributeHeader`);
    const filterRow = document.getElementById(`${layerId}-attributeFilters`);
    const tbody = document.querySelector(`#${layerId}-attributeTable tbody`);

    headerRow.innerHTML = "";
    filterRow.innerHTML = "";
    tbody.innerHTML = "";

    const dropdownField = options.filterDropdownField || null;

    fields.forEach((field) => {
      const headerCell = document.createElement("th");
      headerCell.textContent = field;
      headerCell.style.cursor = "pointer";
      headerCell.dataset.field = field;
      headerCell.dataset.sortDirection = ""; // 'asc', or 'desc'
      headerCell.addEventListener("click", () => handleSort(field, headerCell));
      headerRow.appendChild(headerCell);

      const filterCell = document.createElement("th");

      if (field === dropdownField) {
        // Create dropdown filter
        const select = document.createElement("select");
        select.dataset.field = field;

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Категория";
        select.appendChild(defaultOption);

        // Collect unique values from features for dropdown filter
        const uniqueValues = new Set();
        features.forEach((feature) => {
          const value = feature.get(field);
          if (value !== undefined && value !== null) {
            uniqueValues.add(value);
          }
        });

        Array.from(uniqueValues)
          .sort()
          .forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
          });

        select.addEventListener("change", () => applyColumnFilters(fields));
        filterCell.appendChild(select);
      } else {
        // Default: text input filter
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Филтрирай...";
        input.dataset.field = field;
        input.style.width = "95%";
        input.addEventListener("input", () => applyColumnFilters(fields));
        filterCell.appendChild(input);
      }

      filterRow.appendChild(filterCell);
    });

    features.forEach((feature) => {
      const tr = document.createElement("tr");
      const featureId = feature.ol_uid;
      tr.dataset.featureId = featureId;

      const props = feature.getProperties();
      delete props.geometry;
      originalFeatureData.set(featureId, { ...props });

      if (editingEnabled) tr.classList.add("editing-row");

      fields.forEach((field) => {
        const td = document.createElement("td");
        td.contentEditable = editingEnabled;
        td.textContent = props[field] ?? "";
        td.dataset.field = field;

        td.addEventListener("input", () => {
          const value = td.textContent.trim();
          const field = td.dataset.field;
          const featureId = tr.dataset.featureId;

          const original = originalFeatureData.get(featureId);
          const originalValue = original?.[field] ?? "";

          const expectedType = fieldTypes[field];
          let valid = true;

          // Type validation
          if (expectedType === "number") {
            valid = !isNaN(Number(value));
          } else if (expectedType === "boolean") {
            valid =
              value.toLowerCase() === "true" || value.toLowerCase() === "false";
          }

          // Highlight invalid cells
          td.style.backgroundColor = valid ? "" : "#fdd";

          // Only mark as edited if value is actually different
          const isDifferent = value !== String(originalValue).trim();

          if (isDifferent) {
            tr.dataset.edited = "true";
            attributeChangesMade = true;
          } else {
            tr.dataset.edited = "";
            // Check if any other fields in the same row are edited
            const stillEdited = Array.from(tr.cells).some((cell) => {
              const fieldName = cell.dataset.field;
              const currentValue = cell.textContent.trim();
              const oldValue = original?.[fieldName] ?? "";
              return currentValue !== String(oldValue).trim();
            });
            if (!stillEdited) {
              tr.dataset.edited = "";
            }
          }

          const anyEdited = document.querySelector(
            `#${layerId}-attributeTable tbody tr[data-edited="true"]`,
          );

          attributeChangesMade = Boolean(anyEdited);
          saveBtn.disabled = !anyEdited;
          undoBtn.disabled = !anyEdited;
        });

        tr.appendChild(td);
      });

      tr.addEventListener("click", () => {
        if (editingEnabled) return;
        const selectedFeature = source
          .getFeatures()
          .find((f) => f.ol_uid == tr.dataset.featureId);
        if (selectedFeature) {
          selectInteraction.getFeatures().clear();
          selectInteraction.getFeatures().push(selectedFeature);
          selectFeatureAndRow(selectedFeature);
        }
      });

      tbody.appendChild(tr);

      if (tr.dataset.featureId === selectedFeatureId) {
        tr.classList.add("selected-row");
        if (shouldScrollToSelectedRow) {
          setTimeout(
            () => tr.scrollIntoView({ behavior: "smooth", block: "center" }),
            0,
          );
          shouldScrollToSelectedRow = false;
        }
      }
    });

    document.getElementById(`${layerId}-attributeModal`).style.display =
      "block";
  }

  function handleSort(field, headerCell) {
    const tbody = document.querySelector(`#${layerId}-attributeTable tbody`);
    const thead = document.querySelector(`#${layerId}-attributeTable thead`);
    const headerRow = thead.rows[0];
    const rows = Array.from(tbody.rows);

    let direction = headerCell.dataset.sortDirection;
    direction = direction === "asc" ? "desc" : "asc";

    headerRow.querySelectorAll("th").forEach((th) => {
      th.dataset.sortDirection = "";
    });
    headerCell.dataset.sortDirection = direction;
    headerCell.textContent = field + (direction === "asc" ? " ↑" : " ↓");

    // Sorting accordingly to data types
    const type = fieldTypes[field] || "string";
    const parse = (val) => {
      if (type === "number") return parseFloat(val) || 0;
      if (type === "boolean") return val.toLowerCase() === "true";
      return val.toLowerCase();
    };

    rows.sort((a, b) => {
      const aVal = parse(
        a.querySelector(`[data-field="${field}"]`).textContent,
      );
      const bVal = parse(
        b.querySelector(`[data-field="${field}"]`).textContent,
      );
      return direction === "asc"
        ? aVal > bVal
          ? 1
          : aVal < bVal
            ? -1
            : 0
        : aVal < bVal
          ? 1
          : aVal > bVal
            ? -1
            : 0;
    });

    rows.forEach((row) => tbody.appendChild(row));
  }

  function applyColumnFilters(fields) {
    const tbody = document.querySelector(`#${layerId}-attributeTable tbody`);
    const rows = Array.from(tbody.rows);

    const filters = {};
    fields.forEach((field) => {
      const inputEl = document.querySelector(
        `#${layerId}-attributeFilters [data-field="${field}"]`,
      );
      if (inputEl && inputEl.value.trim()) {
        filters[field] = inputEl.value.toLowerCase();
      }
    });

    rows.forEach((row) => {
      const cells = Array.from(row.cells);
      const visible = fields.every((field, index) => {
        const el = document.querySelector(`[data-field="${field}"]`);
        if (!filters[field]) return true;

        const cellValue = cells[index].textContent?.toLowerCase() || "";

        if (el.tagName === "SELECT") {
          // Dropdoww exact match or empty filter shows all
          return filters[field] === "" || cellValue === filters[field];
        } else {
          // Input substring match
          return cellValue.includes(filters[field]);
        }
      });
      row.style.display = visible ? "" : "none";
    });
  }
  let openAttrBtn = document.getElementById(`${layerId}-openAttributesBtn`);
  const clonedOpenAttrBtn = openAttrBtn.cloneNode(true);
  openAttrBtn.parentNode.replaceChild(clonedOpenAttrBtn, openAttrBtn);
  openAttrBtn = clonedOpenAttrBtn;
  openAttrBtn.addEventListener("click", buildAttributeTable);

  // Toggle editing
  let toggleEditBtn = document.getElementById(`${layerId}-toggleEditBtn`);
  const clonedEditBtn = toggleEditBtn.cloneNode(true);
  toggleEditBtn.parentNode.replaceChild(clonedEditBtn, toggleEditBtn);
  toggleEditBtn = clonedEditBtn;

  toggleEditBtn.addEventListener("click", () => {
    if (editingEnabled && attributeChangesMade) {
      const confirmStop = confirm(
        "Имате незапазени промени в атрибутивната таблица. Сигурни ли сте, че искате да спрете редактирането преди да сте запазили промените?",
      );
      if (!confirmStop) return;
    }

    editingEnabled = !editingEnabled;
    toggleEditBtn.textContent = editingEnabled ? "Спри редактирането" : "✏️";

    if (!editingEnabled) {
      attributeChangesMade = false; // Reset when exiting editing mode
    }

    buildAttributeTable();
  });

  // Save edits
  let saveBtn = document.getElementById(`${layerId}-saveChangesBtn`);
  const clonedSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(clonedSaveBtn, saveBtn);
  saveBtn = clonedSaveBtn;
  saveBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll(
      `#${layerId}-attributeTable tbody tr`,
    );

    let hasInvalid = false;

    rows.forEach((row) => {
      if (row.dataset.edited !== "true") return;

      const featureId = row.dataset.featureId;
      const feature = source.getFeatures().find((f) => f.ol_uid == featureId);

      if (!feature) return;

      const cells = row.querySelectorAll("td");

      for (const cell of cells) {
        const field = cell.dataset.field;
        const rawValue = cell.textContent.trim();
        const expectedType = fieldTypes[field];
        let parsedValue = rawValue;

        // Validate types
        if (expectedType === "number") {
          parsedValue = Number(rawValue);
          if (isNaN(parsedValue)) {
            hasInvalid = true;
            cell.style.backgroundColor = "#fdd"; // highlight invalid
            continue;
          }
        } else if (expectedType === "boolean") {
          if (
            rawValue.toLowerCase() === "true" ||
            rawValue.toLowerCase() === "false"
          ) {
            parsedValue = rawValue.toLowerCase() === "true";
          } else {
            hasInvalid = true;
            cell.style.backgroundColor = "#fdd";
            continue;
          }
        }

        feature.set(field, parsedValue);
        cell.style.backgroundColor = "";
        originalFeatureData.set(featureId, {
          ...feature.getProperties(),
          geometry: undefined,
        });
      }

      row.dataset.edited = "";
    });

    if (hasInvalid) {
      alert(
        "Някои от въведените стойности са невалидни. Моля, поправете ги преди запазване на промените.",
      );
      return;
    }

    alert("Промените са запазени.");
    attributeChangesMade = false;
    saveBtn.disabled = true;
    undoBtn.disabled = true;
    downloadBtn.disabled = false;
  });

  // Undo changes
  let undoBtn = document.getElementById(`${layerId}-undoChangesBtn`);
  const clonedUndoBtn = undoBtn.cloneNode(true);
  undoBtn.parentNode.replaceChild(clonedUndoBtn, undoBtn);
  undoBtn = clonedUndoBtn;
  undoBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll(
      `#${layerId}-attributeTable tbody tr`,
    );
    rows.forEach((row) => {
      const featureId = row.dataset.featureId;
      const original = originalFeatureData.get(featureId);
      if (!original) return;

      row.querySelectorAll("td").forEach((td) => {
        const field = td.dataset.field;
        td.textContent = original[field] ?? "";
      });

      row.dataset.edited = "false";
    });

    attributeChangesMade = false;

    saveBtn.disabled = true;
    undoBtn.disabled = true;
    if (source.getFeatures().length === 0) {
      downloadBtn.disabled = true;
    }
  });

  // Draw logic for adding new features

  if (enableDrawing) {
    let toggleDrawBtn = document.getElementById(`${layerId}-toggleDrawBtn`);
    const clonedDrawBtn = toggleDrawBtn.cloneNode(true);
    toggleDrawBtn.parentNode.replaceChild(clonedDrawBtn, toggleDrawBtn);
    toggleDrawBtn = clonedDrawBtn;
    toggleDrawBtn.addEventListener("click", () => {
      if (drawingLocked) {
        alert(
          "Имате незапазен обект, моля, запазете го или откажете добавянето преди да спрете режима за добавяне на нови обекти.",
        );
        return;
      }
      if (!isDrawing) {
        drawInteraction = new Draw({
          source: source,
          type: geometryType,
        });

        snapInteraction = new Snap({ source: source });

        drawInteraction.on("drawend", (event) => {
          newFeature = event.feature;
          const schema = getFieldsFromSource(source);

          drawingLocked = true;
          map.removeInteraction(drawInteraction);
          map.removeInteraction(snapInteraction);
          drawInteraction = null;
          isDrawing = false;

          showAttributeInputForm(schema);
        });

        map.addInteraction(drawInteraction);
        map.addInteraction(snapInteraction);
        isDrawing = true;
        toggleDrawBtn.textContent = "Спри добавянето на обекти";
      } else {
        map.removeInteraction(drawInteraction);
        map.removeInteraction(snapInteraction);
        drawInteraction = null;
        isDrawing = false;
        toggleDrawBtn.innerHTML = '<i class="bi bi-plus-circle-fill">';
      }
    });

    let saveAttrBtn = document.getElementById("saveAttrBtn");
    const clonedSaveAttrBtn = saveAttrBtn.cloneNode(true);
    saveAttrBtn.parentNode.replaceChild(clonedSaveAttrBtn, saveAttrBtn);
    saveAttrBtn = clonedSaveAttrBtn;
    saveAttrBtn.addEventListener("click", () => {
      const form = document.getElementById("attributeForm");
      const formData = new FormData(form);
      const attributes = {};
      for (const [key, value] of formData.entries()) {
        attributes[key] = value;
      }

      if (newFeature) {
        newFeature.setProperties(attributes);
        newFeature = null;
      }

      document.getElementById("attributeInputModal").style.display = "none";
      drawingLocked = false;

      drawInteraction = new Draw({ source: source, type: geometryType });
      snapInteraction = new Snap({ source: source });

      drawInteraction.on("drawend", (event) => {
        newFeature = event.feature;
        const schema = getFieldsFromSource(source);

        drawingLocked = true;

        map.removeInteraction(drawInteraction);
        map.removeInteraction(snapInteraction);
        drawInteraction = null;
        isDrawing = false;

        showAttributeInputForm(schema);
      });

      map.addInteraction(drawInteraction);
      map.addInteraction(snapInteraction);
      isDrawing = true;

      toggleDrawBtn.textContent = "Спри добавянето на обекти";
    });

    let cancelAttrBtn = document.getElementById("cancelAttrBtn");
    const clonedCancelAttrBtn = cancelAttrBtn.cloneNode(true);
    cancelAttrBtn.parentNode.replaceChild(clonedCancelAttrBtn, cancelAttrBtn);
    cancelAttrBtn = clonedCancelAttrBtn;
    cancelAttrBtn.addEventListener("click", () => {
      if (newFeature) {
        source.removeFeature(newFeature);
        newFeature = null;
      }

      document.getElementById("attributeInputModal").style.display = "none";
      map.removeInteraction(drawInteraction);
      map.removeInteraction(snapInteraction);
      drawInteraction = null;
      isDrawing = false;
      drawingLocked = false;
      toggleDrawBtn.innerHTML = '<i class="bi bi-plus-circle-fill">';
    });
  }

  // Modify geometry
  let modifyGeometryBtn = document.getElementById(
    `${layerId}-modifyGeometryBtn`,
  );
  const clonedModifyBtn = modifyGeometryBtn.cloneNode(true);
  modifyGeometryBtn.parentNode.replaceChild(clonedModifyBtn, modifyGeometryBtn);
  modifyGeometryBtn = clonedModifyBtn;

  modifyGeometryBtn.addEventListener("click", () => {
    if (!previouslyHighlighted) return;
    document.getElementById(`${layerId}-attributeModal`).style.display = "none";
    if (!isModifying) {
      originalGeometry = previouslyHighlighted.getGeometry().clone();
      modifyInteraction = new Modify({
        features: new Collection([previouslyHighlighted]),
      });
      snapInteraction = new Snap({ source });
      map.addInteraction(modifyInteraction);
      map.addInteraction(snapInteraction);

      if (hoverInteraction) hoverInteraction.setActive(false);

      isModifying = true;
      modifyGeometryBtn.textContent =
        "Запазване/отмяна на редактирането на геометрията...";
    } else {
      // stop modify
      const currentGeometry = previouslyHighlighted.getGeometry();
      if (!geometriesEqual(originalGeometry, currentGeometry)) {
        const shouldSave = confirm(
          "Искате ли да запазите редакциите на геометрията?",
        );
        if (!shouldSave) {
          previouslyHighlighted.setGeometry(originalGeometry);
          alert("Редакциите на геометрията са отхвърлени.");
        } else {
          alert("Редакциите на геометрията са запазени.");
        }
      }

      map.removeInteraction(modifyInteraction);
      map.removeInteraction(snapInteraction);
      modifyInteraction = null;
      snapInteraction = null;
      if (hoverInteraction) hoverInteraction.setActive(true);
      isModifying = false;
      modifyGeometryBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    }
  });

  // for updating the distance_m dynamically on modifying geometry
  if (layerId === "route") {
    source.getFeatures().forEach((feature) => {
      const geometry = feature.getGeometry();
      geometry.on("change", () => {
        updateRouteDistance(feature);
      });
    });
  }

  // Delete feature
  let deleteBtn = document.getElementById(`${layerId}-deleteFeatureBtn`);
  const clonedDeleteBtn = deleteBtn.cloneNode(true);
  deleteBtn.parentNode.replaceChild(clonedDeleteBtn, deleteBtn);
  deleteBtn = clonedDeleteBtn;
  deleteBtn.addEventListener("click", () => {
    if (previouslyHighlighted) {
      const confirmDelete = confirm(
        "Сигурни ли сте, че искате да изтриете този обект?",
      );
      if (confirmDelete) {
        const featureId = previouslyHighlighted.ol_uid;
        source.removeFeature(previouslyHighlighted);

        const row = document.querySelector(
          `#${layerId}-attributeTable tbody tr[data-feature-id="${featureId}"]`,
        );
        if (row) row.remove();

        previouslyHighlighted = null;
        selectedFeatureId = null;

        document
          .querySelectorAll(`#${layerId}-attributeTable tbody tr`)
          .forEach((r) => r.classList.remove("selected-row"));
        document.getElementById(
          `${layerId}-selectedFeatureWarning`,
        ).style.display = "none";
        deleteBtn.disabled = true;
        modifyGeometryBtn.disabled = true;
        clearSelectionBtn.disabled = true;

        selectInteraction.getFeatures().clear();
        buildAttributeTable();
      }
    } else {
      alert("Няма избран обект за изтриване.");
    }
  });

  // Export
  let downloadBtn = null;
  if (layerId !== "points" && layerId !== "route") {
    downloadBtn = document.getElementById(`${layerId}-downloadGeoJSONBtn`);
    const clonedDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(clonedDownloadBtn, downloadBtn);
    downloadBtn = clonedDownloadBtn;

    downloadBtn.addEventListener("click", () => {
      exportGeoJSONFromLayer(layer, `${layerId}_edited.geojson`);
    });
  }

  function getFieldsFromSource(source) {
    const features = source.getFeatures();
    if (!features.length) return [];
    const props = features[0].getProperties();
    delete props.geometry;
    return Object.keys(props);
  }

  function showAttributeInputForm(schema) {
    const form = document.getElementById("attributeForm");
    form.innerHTML = "";

    schema.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("form-group");

      const label = document.createElement("label");
      label.setAttribute("for", `attr-${field}`);
      label.textContent = field;

      const input = document.createElement("input");
      input.type = "text";
      input.name = field;
      input.id = `attr-${field}`;
      input.classList.add("form-control");

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      form.appendChild(wrapper);
    });

    document.getElementById("attributeInputModal").style.display = "block";
  }

  function coordsEqual(coords1, coords2) {
    if (coords1.length !== coords2.length) return false;
    for (let i = 0; i < coords1.length; i++) {
      if (Array.isArray(coords1[i]) && Array.isArray(coords2[i])) {
        if (!coordsEqual(coords1[i], coords2[i])) return false;
      } else {
        if (coords1[i] !== coords2[i]) return false;
      }
    }
    return true;
  }

  function geometriesEqual(g1, g2) {
    if (!g1 || !g2) return false;
    if (g1.getType() !== g2.getType()) return false;
    return coordsEqual(g1.getCoordinates(), g2.getCoordinates());
  }

  window._layerManagers = window._layerManagers || {};
  window._layerManagers[layerId] = {
    cleanup: () => {
      if (selectInteraction) map.removeInteraction(selectInteraction);
      if (hoverInteraction) map.removeInteraction(hoverInteraction);
      if (modifyInteraction) map.removeInteraction(modifyInteraction);
      if (snapInteraction) map.removeInteraction(snapInteraction);
      if (drawInteraction) map.removeInteraction(drawInteraction);
    },
  };
  // Register cleanup to remove interactions
  interactionRegistry[layerId] = {
    select: selectInteraction,
    hover: hoverInteraction,
    cleanup: () => {
      map.removeInteraction(selectInteraction);
      map.removeInteraction(hoverInteraction);
    },
  };
}

function exportGeoJSONFromLayer(layer, filename = "layer.geojson") {
  if (!layer || !layer.getSource) {
    alert("Слоят не е наличен.");
    return;
  }

  const source = layer.getSource();
  if (!source || source.getFeatures().length === 0) {
    alert("Няма обекти за експортиране.");
    return;
  }

  const format = new GeoJSON();
  const geojsonStr = format.writeFeatures(source.getFeatures(), {
    featureProjection: map.getView().getProjection(),
  });

  const blob = new Blob([geojsonStr], { type: "application/vnd.geo+json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

map.on("click", (evt) => {
  //Prevent adding points while drawing, modifying and map selection are active
  if (isDrawing) return;
  if (drawingLocked) return;
  if (isModifying) return;
  if (mapSelectionEnabled) return;

  if (tspCalculated) {
    // Clear previous route and POI labels
    if (routeLayer) {
      map.removeLayer(routeLayer);
      routeLayer = null;
    }

    pointFeatures.forEach((f) => {
      f.set("route_order", null);
    });
    pointLayer.getSource().changed();

    tspCalculated = false;
    lastRouteCoords = [];
  }

  const clickedCoord = evt.coordinate;
  const nearest = findNearestNode(clickedCoord);
  if (!nearest) {
    alert("Няма намерен близък възел.");
    return;
  }

  const isStart = points.length === 0;
  points.push({ clicked: clickedCoord, snapKey: nearest.key });

  const feature = new Feature({
    geometry: new Point(clickedCoord),
    name: isStart ? "Начална точка" : "Точка на интерес",
  });

  pointSource.addFeature(feature);
  pointFeatures.push(feature);
});

window.calculateTSP = calculateTSP;
window.resetApp = resetApp;
window.undoLastPoint = undoLastPoint;

// Build graph
pedestrianNetwork.getSource().on("featuresloadend", () => {
  const features = pedestrianNetwork.getSource().getFeatures();
  buildGraph(features);
});

pointLayer.setStyle((feature) => {
  const routeOrder = feature.get("route_order");
  const isStart =
    routeOrder === 1 || (routeOrder == null && feature === pointFeatures[0]);

  return new Style({
    image: isStart
      ? new Circle({
          radius: 7,
          fill: new Fill({ color: "#28821e" }),
          stroke: new Stroke({ color: "#fff", width: 1 }),
        })
      : new Icon({
          src: "./icons/pin.png",
          scale: 0.012,
        }),
    text: routeOrder
      ? new Text({
          text: routeOrder.toString(),
          font: "bold 12px Arial",
          fill: new Fill({ color: "#000" }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
          offsetY: -15,
        })
      : null,
  });
});

setupLayerWithFullUI({
  map,
  layer: druzhbaBorder,
  source: druzhbaBorder.getSource(),
  layerId: "druzhba",
});

setupLayerWithFullUI({
  map,
  layer: pointLayer,
  source: pointLayer.getSource(),
  layerId: "points",
});

const layerMap = {
  pedestrianNetwork: pedestrianNetwork,
  druzhbaBorder: druzhbaBorder,
  poiLayer: pointLayer,
  routeLayer: routeLayer,
};

document
  .querySelectorAll("input.form-check-input[type=checkbox]")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const layerId = e.target.id;
      const isVisible = e.target.checked;

      if (layerMap[layerId]) {
        layerMap[layerId].setVisible(isVisible);
      } else {
        console.warn(
          `Слоят с идентификатор ${layerId} не е намерен или все още не е инициализиран.`,
        );
      }
    });
  });

document.getElementById("osm").addEventListener("change", (e) => {
  if (osmMap) {
    osmMap.setVisible(e.target.checked);
  }
});

document.getElementById("exportPOIBtn").addEventListener("click", () => {
  exportGeoJSONFromLayer(pointLayer, "POIs.geojson");
});

document.getElementById("exportRouteBtn").addEventListener("click", () => {
  exportGeoJSONFromLayer(routeLayer, "Route.geojson");
});
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
  new Tooltip(el);
});
