import { MapComponent } from "./components/map";
import { GlyphComponent } from "./components/glyph";
import { TabComponent } from "./components/tab";

export const routes = [
  { path: "", component: GlyphComponent },
  { path: "map", component: MapComponent },
  { path: "tab", component: TabComponent },
];

export const navigatableComponents = [
    TabComponent,
    MapComponent,
    GlyphComponent
];