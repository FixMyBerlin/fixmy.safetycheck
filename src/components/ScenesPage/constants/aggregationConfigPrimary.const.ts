// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

import { AggregationConfig } from './types'

export const aggregationConfigPrimary: AggregationConfig = {
  leftOfBicycleLane: {
    title: 'Führung des Radverkehrs',
    buckets: {
      car_lanes: 'Fahr&shy;bahn',
      parking_lane: 'Rechts v. Parken',
      curb: 'Seiten&shy;raum',
      no_cars: 'Ohne Kfz-Ver&shy;kehr',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
  bicycleLaneWidth: {
    title: 'Radverkehrsanlage (RVA)',
    resultTitle: 'Radverkehrsanlage',
    buckets: {
      wide: 'Breite<br />3,5&thinsp;m',
      narrow: 'Breite<br />2&thinsp;m',
      shared_bus_lane: 'Busspur Fahrrad frei',
      none: 'Keine RVA',
    },
    resultBuckets: {
      wide: 'Gesamtbreite:',
      narrow: 'Gesamtbreite:',
      shared_bus_lane: 'Busspur mit Fahrrad frei',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
  parking: {
    title: 'Kfz-Parken vorhanden',
    resultTitle: 'Kfz-Parken',
    buckets: {
      noChoice: 'Egal',
      parking_lane: 'Ja',
      no_parking: 'Nein',
    },
    resultBuckets: {
      parking_lane: 'Mit Parkspur',
      no_parking: 'Ohne Parkspur',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
    primaryGroup: true,
  },
  bicycleLaneSurface: {
    title: 'Oberfläche RVA',
    buckets: {
      noChoice: 'Egal',
      surface_asphalt: 'Asphalt',
      surface_green: 'Grün&shy;markierung',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferHasPhysicalProtection: {
    title: 'Bauliche Trennung Links RVA',
    resultTitle: 'Bauliche Trennung Links',
    buckets: {
      noChoice: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferLeftPhysicalProtection: {
    title: 'Einzelne bauliche Trennung auswählen',
    resultTitle: 'Art der baul. Trennung Links',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      planter: 'Blumenkästen',
      hedge: 'Hecke',
    },
    choiceMode: 'single',
    showAsIcons: true,
    groupEndIndicator: true,
  },
  bufferLeftWidth: {
    title: 'Markierung Links RVA',
    resultTitle: 'Markierung Links',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      none: 'Keine',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferLeftMarking: {
    title: 'Einzelne Markierungsart auswählen',
    resultTitle: 'Art der Markierung Links',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      dashed_line: 'Breitstrich unterbrochen',
      solid_line: 'Breitstrich durchgezogen',
      double_line: 'Doppelstrich',
      restricted_area: 'Sperrfläche',
      paved_verge: 'Aufpflasterung',
      grass_verge: 'Grünstreifen',
    },
    choiceMode: 'single',
    showAsIcons: true,
  },
  bufferRightWidth: {
    title: 'Markierung Rechts RVA',
    resultTitle: 'Markierung Rechts',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      none: 'Keine',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferRightMarking: {
    title: 'Einzelne Markierungsart auswählen',
    resultTitle: 'Art der Markierung Rechts',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      solid_line: 'Breitstrich durchgezogen',
      double_line: 'Doppelstrich',
      restricted_area: 'Sperrfläche',
      paved_verge: 'Aufpflasterung',
      grass_verge: 'Grünstreifen',
      grass_verge_with_street_cabinet: 'Grünstreifen mit Stromkästen',
    },
    choiceMode: 'single',
    showAsIcons: true,
    groupEndIndicator: true,
  },
  vehicleTrafficVolume: {
    title: 'Kfz-Verkehrsaufkommen',
    buckets: {
      noChoice: 'Egal',
      low_traffic_volumen: 'Niedrig',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch<br />(mit LKW)',
    },
    resultBuckets: {
      low_traffic_volumen: 'Niedrig (ohne Schwerlastverkehr)',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch (mit Schwerlastverkehr)',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneMaxspeed: {
    title: 'Zulässige Höchstgeschwindigkeit',
    buckets: {
      noChoice: 'Egal',
      '30': '30 km/h',
      '50': '50 km/h',
    },
    sortOrder: ['noChoice', '30', '50'],
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrstreifen Nutzung',
    resultTitle: 'Nutzung der Fahrstreifen',
    buckets: {
      noChoice: 'Egal',
      motor_vehicle_and_tram: 'Mit Tram',
      motor_vehicle_only: '1 Fahr&shy;streifen',
      motor_vehicle_only_one_way: '2 Fahr&shy;streifen',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
  },
  pavementWidth: {
    title: 'Gehweg',
    resultTitle: 'Gehwegbreite',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      none: 'Kein Gehweg',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  pavementHasShops: {
    title: 'Geschäfte / Cafétische',
    buckets: {
      noChoice: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    resultBuckets: {
      true: 'Ja (mit Tischen, Auslage)',
      false: 'Nein (reiner Gehweg)',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
}
