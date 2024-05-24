"use client";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import { FaDirections } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Phone } from "lucide-react";
const MapView = () => {
  const mapLocation = [28.6139, 77.209]; // Replace with your desired latitude and longitude
  const title = "New Delhi, India"; // Replace with your desired title
  const latAndLong = "28.6139,77.2090"; // Replace with your desired lat and long

  return (
    <div className="border flex flex-col gap-2 p-4 shadow rounded-md  ">
      <div className="">
        <h4 className="text-xl font-normal">Call</h4>
        <h5 className=" font-normal text-indigo-500">+91 9572013778</h5>
      </div>
      <div className="">
        <h4 className="text-xl font-normal">Pricing</h4>
        <div className=" flex flex-col text-gray-500 ">
          {/* ------black and white----- */}
          <div className="flex items-center justify-between">
            <p className=" ">Black and White</p>
            <p className=" ">₹ 1</p>
          </div>
          {/* ------color------ */}
          <div className="flex items-center justify-between">
            <p className=" ">Color Print</p>
            <p className=" ">₹ 5</p>
          </div>

          {/* ----lamination--------- */}
          <div className="flex items-center justify-between">
            <p className=" ">Lamination</p>
            <p className=" ">₹ 1</p>
          </div>

          {/* -----binding---------- */}
          <div className="flex items-center justify-between">
            <p className=" ">Binding</p>
            <p className=" ">₹ 1</p>
          </div>
        </div>
      </div>
      <div >
        <h4 className="text-xl font-normal">Direction</h4>
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
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg">
          <MdContentCopy /> Copy
        </button>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latAndLong}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-400 rounded-lg"
        >
          <span className="">
            <FaDirections />
          </span>{" "}
          Direction
        </a>
      </div>
    </div>
  );
};

export default MapView;
