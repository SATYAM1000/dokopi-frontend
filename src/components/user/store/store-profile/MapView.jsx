"use client";
import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const MapView = ({ storeData }) => {
  console.log(storeData);
 

  const { storeLocationCoordinates, storeDetails, storePrices } = storeData;
  const { storePhoneNumber, storeLocation } = storeDetails;
  const [mapLocation, setmapLocation] = useState(
    storeLocationCoordinates.coordinates
  ); // Replace with your desired latitude and longitude
  const title = "New Delhi, India"; // Replace with your desired title
  const latAndLong = "28.6139,77.2090"; // Replace with your desired lat and long
  const [priceList, SetPriceList] = useState([]);
  const getPriceList = () => {
    const dummyData = [];
    for (let key in storePrices) {
      const NewObj = {
        category: key,
        value: storePrices[key],
      };
      dummyData.push(NewObj);
    }
    SetPriceList(dummyData);
  };
  useEffect(() => {
    if (storePrices) {
      getPriceList();
    }
  }, []);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${storeLocation.storeLandmark}, ${storeLocation.storeCity}, ${storeLocation.storeState}, ${storeLocation.storeCountry}, ${storeLocation.storeZipCode}`
  )}`;
  return (
    <div className="border flex flex-col gap-2 p-4 shadow rounded-md  ">
      <div className="">
        <h4 className="text-xl font-normal">Call</h4>
        <h5 className=" text-gray-600 text-sm font-medium">
          +91-{storePhoneNumber}
        </h5>
      </div>
      <div className="">
        <h4 className="text-xl font-normal">Pricing</h4>
        <div className=" flex flex-col text-gray-500 gap-1">
          {priceList.length > 0 &&
            priceList.map((price) => (
              <div
                className="flex items-center justify-between text-sm text-gray-600 "
                key={price.category + price.value}
              >
                <p className="capitalize">{price.category}</p>
                <p className=" ">₹&nbsp;{price.value}</p>
              </div>
            ))}
          {/* ------black and white----- */}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-normal">Direction</h4>
        {typeof window !== "undefined" && (
          <div className="w-full h-48 mt-2">
            <MapContainer
              center={mapLocation}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full -z-20"
              doubleClickZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapLocation}>
                <Popup>{title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer text-sm flex items-center gap-2"
        >
          {storeLocation.storeLandmark},{storeLocation.storeCity},
          {storeLocation.storeState},{storeLocation.storeCountry},
          {storeLocation.storeZipCode}
          <span>
            {typeof window !== "undefined" && <ExternalLink size={18} />}
          </span>
        </a>
      </div>
    </div>
  );
};

export default MapView;
