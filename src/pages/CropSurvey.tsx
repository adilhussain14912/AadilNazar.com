import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Fix for default marker icon in leaflet with bundlers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Search Control Component
const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // @ts-ignore - plugin types might be slightly off
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: "bar",
            showMarker: true,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: true,
            searchLabel: "جاءِ ڳوليو (Search place)",
        });

        map.addControl(searchControl);
        return () => {
            map.removeControl(searchControl);
        };
    }, [map]);

    return null;
};

const CropSurvey = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Container holding the map, adjusting for typical navbar height */}
            <div className="flex-1 w-full relative pt-20">
                <MapContainer
                    center={[26.0, 68.5]} // default zoom focuses on Sindh
                    zoom={7}
                    className="w-full h-full min-h-[500px] z-0"
                    style={{ height: 'calc(100vh - 80px)' }}
                    attributionControl={false}
                    zoomControl={false}
                >
                    {/* Satellite View */}
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {/* Add search to map */}
                    <SearchControl />
                </MapContainer>
            </div>
        </div>
    );
};

export default CropSurvey;
