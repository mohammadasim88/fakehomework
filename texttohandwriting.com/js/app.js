import {
  addFontFromFile,
  formatText,
  addPaperFromFile,
} from "./utils/helpers.js";
import { generateImages, downloadAsPDF, deleteAll } from "./generate-images.js";
import { setInkColor, toggleDrawCanvas } from "./utils/draw.js";
const pageEl = document.querySelector(".page-a");
const setTextareaStyle = (attrib, v) => (pageEl.style[attrib] = v);
const EVENT_MAP = {
  "#generate-image-form": {
    on: "submit",
    action: (e) => {
      e.preventDefault();
      generateImages();
    },
  },
  "#handwriting-font": {
    on: "change",
    action: (e) => {
      setTextareaStyle(
        "fontSize",
        e.target.selectedOptions[0].getAttribute("fontsize") + "px"
      );
      document.getElementById("font-size").value =
        e.target.selectedOptions[0].getAttribute("fontsize");
      document
        .getElementById("font-size")
        .setAttribute(
          "maxvalue",
          e.target.selectedOptions[0].getAttribute("fontsize")
        );
      document.body.style.setProperty("--handwriting-font", e.target.value);
    },
  },
  "#font-size": {
    on: "change",
    action: (e) => {
      var max = e.target.getAttribute("maxvalue");
      setTextareaStyle("fontSize", e.target.value + "px");
      e.preventDefault();
    },
  },
  "#ink-color": {
    on: "change",
    action: (e) => {
      document.body.style.setProperty("--ink-color", e.target.value);
      setInkColor(e.target.value);
    },
  },
  "#download-as-pdf-button": {
    on: "click",
    action: () => {
      downloadAsPDF();
    },
  },
  "#delete-all-button": {
    on: "click",
    action: () => {
      deleteAll();
    },
  },
  ".page-a .paper-content": { on: "paste", action: formatText },
};
for (const eventSelector in EVENT_MAP) {
  document
    .querySelector(eventSelector)
    .addEventListener(
      EVENT_MAP[eventSelector].on,
      EVENT_MAP[eventSelector].action
    );
}
document.querySelectorAll(".switch-toggle input").forEach((toggleInput) => {
  toggleInput.addEventListener("change", (e) => {
    if (toggleInput.checked) {
      document.querySelector(
        `label[for="${toggleInput.id}"] .status`
      ).textContent = "on";
      toggleInput.setAttribute("aria-checked", true);
    } else {
      toggleInput.setAttribute("aria-checked", false);
      document.querySelector(
        `label[for="${toggleInput.id}"] .status`
      ).textContent = "off";
    }
  });
});
