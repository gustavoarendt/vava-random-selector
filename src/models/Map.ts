export interface Coords {
  regionName: string;
  superRegionName: string;
  location: {
    x: 5875.4106;
    y: 4924.497;
  };
}

export interface Map {
  uuid: string;
  displayName: string;
  coordinates: string;
  displayIcon: string;
  listViewIcon: string;
  splash: string;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts: Coords[];
}
