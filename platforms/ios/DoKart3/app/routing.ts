import { MapComponent } from "./components/map";
import { GlyphComponent } from "./components/glyph";
import { TabComponent } from "./components/tab";
import { InfoComponent } from "./components/info";

export const routes = [
  { path: "glyph", component: GlyphComponent },
  { path: "", component: MapComponent },
  { path: "tab", component: TabComponent },
];

export const navigatableComponents = [
    TabComponent,
    MapComponent,
    GlyphComponent,
    InfoComponent
];