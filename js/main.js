import { Eye } from "./eye.js";

// Check for Houdini support
if ("paintWorklet" in CSS) {
  try {
    await CSS.paintWorklet.addModule("css/houdini-worklet.js");
    document.body.classList.add("houdini-supported");
    console.log("Houdini worklet loaded");
  } catch (error) {
    console.error("Failed to load Houdini worklet:", error);
  }
}

// Initialize eye
try {
  new Eye("eye-container");
  console.log("Eye initialized");
} catch (error) {
  console.error("Failed to initialize eye:", error);
}
