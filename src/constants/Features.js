export const MAPBOX_COORDS = {
  features: [
    {
      type: 'Feature',
      properties: {
        Name: 'Alemany Farm',
      },
      geometry: {
        coordinates: [
          [-122.419503, 37.73237],
          [-122.420442, 37.732396],
          [-122.420517, 37.732917],
          [-122.420648, 37.733253],
          [-122.42052, 37.7337],
          [-122.420267, 37.734068],
          [-122.419237, 37.733992],
          [-122.419291, 37.733376],
          [-122.419347, 37.732567],
          [-122.41949, 37.732492],
          [-122.419503, 37.73237],
        ],
        type: 'Polygon',
      },
      id: '5aa2d6d8b8dabcd5a977dc2783871d75',
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Fruit Alley',
        Type: 'Naturalized Open Spaces',
      },
      geometry: {
        coordinates: [
          [-122.42002, 37.732937],
          [-122.420035, 37.733048],
          [-122.420051, 37.733098],
          [-122.420177, 37.733076],
          [-122.420154, 37.732894],
          [-122.42002, 37.732937],
        ],
        type: 'Polygon',
      },
      id: '5cbc7c0ffc58b75a03a473e02b16a87a',
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Marsh',
        Type: 'Water Features',
      },
      geometry: {
        coordinates: [
          [-122.420037, 37.732937],
          [-122.42002, 37.732937],
          [-122.419746, 37.732926],
          [-122.419708, 37.732754],
          [-122.419869, 37.732663],
          [-122.420047, 37.732717],
          [-122.420037, 37.732937],
        ],
        type: 'Polygon',
      },
      id: '7fa94c10e9e0d0f4e8efde93ac6464ab',
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Orchard Terraces',
        Type: 'Agricultural Areas',
      },
      geometry: {
        coordinates: [
          [-122.419705, 37.733375],
          [-122.419453, 37.733376],
          [-122.419291, 37.733376],
          [-122.419213, 37.733801],
          [-122.419684, 37.733741],
          [-122.42002, 37.733624],
          [-122.420256, 37.733411],
          [-122.420202, 37.733265],
          [-122.419961, 37.733382],
          [-122.419705, 37.733375],
        ],
        type: 'Polygon',
      },
      id: '9f6d7f707ae823e973ac24f34d9052c3',
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Riparian Habitat',
      },
      geometry: {
        coordinates: [
          [-122.420442, 37.732396],
          [-122.41952, 37.732392],
          [-122.419759, 37.732475],
          [-122.420097, 37.732522],
          [-122.42025, 37.732509],
          [-122.420442, 37.732396],
        ],
        type: 'Polygon',
      },
      id: 'db46f86b0d2f1e4d0711e0c7a8396deb',
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Orchard',
        Type: 'Agricultural Areas',
      },
      geometry: {
        coordinates: [
          [-122.419668, 37.732645],
          [-122.419523, 37.732814],
          [-122.419513, 37.732887],
          [-122.419456, 37.73335],
          [-122.419291, 37.733376],
          [-122.419268, 37.733279],
          [-122.419357, 37.733177],
          [-122.419383, 37.732925],
          [-122.419474, 37.732731],
          [-122.419634, 37.73261],
          [-122.419668, 37.732645],
        ],
        type: 'Polygon',
      },
      id: 'fa612d9be1041390b9f4becd9ea8909e',
    },
  ],
  type: 'FeatureCollection',
};

export const FEATURE_POLYGONS = Object.fromEntries(
  MAPBOX_COORDS.features.map(feature => {
    const coordinates = feature.geometry.coordinates.map(coord => ({
      longitude: coord[0],
      latitude: coord[1],
    }));
    return [feature.properties.Name, coordinates];
  }),
);
