import { TypeCADApp } from "./app/TypeCADApp";
import "./styles.css";
const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("Missing #app root");
new TypeCADApp(root).mount();