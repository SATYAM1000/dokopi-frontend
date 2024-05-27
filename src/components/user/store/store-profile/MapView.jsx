"use client";
import React from "react";
import { ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const MapView = () => {
  const mapLocation = [28.6139, 77.209]; // Replace with your desired latitude and longitude
  const title = "New Delhi, India"; // Replace with your desired title
  const latAndLong = "28.6139,77.2090"; // Replace with your desired lat and long

  return (
    <div className="border flex flex-col gap-2 p-4 shadow rounded-md  ">
      <div className="">
        <h4 className="text-xl font-normal">Call</h4>
        <h5 className=" text-gray-600 text-sm font-medium">+91 9572013778</h5>
      </div>
      <div className="">
        <h4 className="text-xl font-normal">Pricing</h4>
        <div className=" flex flex-col text-gray-500 ">
          {/* ------black and white----- */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p className=" ">Black and White</p>
            <p className=" ">₹ 1</p>
          </div>
          {/* ------color------ */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p className=" ">Color Print</p>
            <p className=" ">₹ 5</p>
          </div>

          {/* ----lamination--------- */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p className=" ">Lamination</p>
            <p className=" ">₹ 1</p>
          </div>

          {/* -----binding---------- */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p className=" ">Binding</p>
            <p className=" ">₹ 1</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-normal">Direction</h4>
        {typeof window !== "undefined" && (
          <div className="w-full h-48 mt-2">
            <MapContainer
              center={mapLocation}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full -z-20"
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
        <p className="text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer text-sm flex items-center gap-2">
          Jadav Nagar, Lane No. 1 , New Delhi, India
          <span>
            {typeof window !== "undefined" && <ExternalLink size={18} />}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MapView;
