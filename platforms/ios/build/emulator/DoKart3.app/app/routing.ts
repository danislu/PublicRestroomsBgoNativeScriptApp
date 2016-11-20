import { MapComponent } from "./components/map";
import { NameComponent } from './components/name';

export const routes = [
  { path: "", component: NameComponent },
  { path: "map", component: MapComponent }
];

export const navigatableComponents = [
    MapComponent,
    NameComponent
];