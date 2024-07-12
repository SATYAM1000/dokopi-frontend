"use client";
import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import Link from "next/link";

const ICON = icon({
  iconUrl: "/main/marker.png",
  iconSize: [28,28],
});

const MapView = ({ storeData }) => {
  const { pricing } = storeData;
  const { storeLocationCoordinates, storeDetails, storePrices } = storeData;
  const { storePhoneNumber, storeLocation } = storeDetails;
  const [renderInClient, setRenderInClient] = useState(false);

  useEffect(() => {
    setRenderInClient(true);
  }, []);

  // In MongoDB GeoJSON data longitude is stored first and then latitude
  const locationCoordinates = {
    lat: storeLocationCoordinates.coordinates[1],
    lng: storeLocationCoordinates.coordinates[0],
  };
  const title = "New Delhi, India";

  const [priceList, setPriceList] = useState([]);

  const getPriceList = () => {
    const dummyData = [];
    for (let key in storePrices) {
      const newObj = {
        category: key,
        value: storePrices[key],
      };
      dummyData.push(newObj);
    }
    setPriceList(dummyData);
  };

  useEffect(() => {
    if (storePrices) {
      getPriceList();
    }
  }, [storePrices]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${storeLocation.storeLandmark}, ${storeLocation.storeCity}, ${storeLocation.storeState}, ${storeLocation.storeCountry}, ${storeLocation.storeZipCode}`
  )}`;

  return (
    <>
      {renderInClient && (
        <div className="border flex flex-col gap-4 p-4 shadow rounded-md">
          <div>
            <h4 className="text-xl font-normal">Call</h4>
            <div className="w-full flex items-center justify-between">
              <h5 className="text-sm font-medium text-indigo-500 underline underline-offset-2">
                +91-{storePhoneNumber}
              </h5>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white text-[13px] py-1 px-3 rounded"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = `tel:+91-${storePhoneNumber}`;
                  }
                }}
              >
                Call Now
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-normal">Direction</h4>
            <div className="w-full h-48 mt-2 relative">
              <MapContainer
                center={locationCoordinates}
                zoom={17}
                scrollWheelZoom={false}
                className="h-full -z-20"
                doubleClickZoom
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={ICON} position={locationCoordinates}>
                  <Popup>{title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer text-sm flex items-center gap-2"
            >
              {storeLocation.storeLandmark}, {storeLocation.storeCity}, {storeLocation.storeState}, {storeLocation.storeCountry}, {storeLocation.storeZipCode}
              <span>{<ExternalLink size={18} />}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MapView;
