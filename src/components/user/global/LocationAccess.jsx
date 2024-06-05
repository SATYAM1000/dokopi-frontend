"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { getUserCoordinates } from "@/lib/getlocation";
import { ChevronDown } from "lucide-react";
import useDebounceCustomeHook from "@/hooks/useDebouceCustomeHook";
import { useQuery } from "@tanstack/react-query";
import { API_DOMAIN } from "@/lib/constants";
import PrintLocationSearchResult from "./PrintLocationSearchResult";
import LocationSearchSkeletion from "./LocationSearchSkeletion";

function SearchResults(SeachLocation) {
  return (
    useQuery({
      queryKey: ['SearchLocationByInput', SeachLocation],
      queryFn: async () => {
        const res = await axios.get(`${API_DOMAIN}/api/v1/location?SeachLocation=${SeachLocation}`);
        return res.data;
      },
      enabled: SeachLocation.length > 2
    })
  )
}

const LocationAccess = ({ apiKey }) => {
  const [location, setLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [SearchboxQuery, setSearchboxQuery] = useState("")
  const debouncedValueSearch = useDebounceCustomeHook(SearchboxQuery, 300);

  const { data, isError, isLoading } = SearchResults(debouncedValueSearch)
  useEffect(() => {
    const address = localStorage.getItem("userAddress");
    setIsClient(true);
    if (address) {
      setUserAddress(address);
    } else {
      setShowModal(true);
    }
  }, []);

  const fetchLocationUsingCoordinates = async (coordinates) => {
    try {
      if (coordinates) {
        setLocation(coordinates);
        const { latitude, longitude } = coordinates;
        if (!localStorage.getItem("userAddress")) {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const formattedAddress = response.data.results[0].formatted_address;
          if (!localStorage.getItem("userAddress")) {
            localStorage.setItem("userAddress", formattedAddress);
          }
        }
        const formattedAddress = localStorage.getItem("userAddress");
        localStorage.setItem("coordinates", JSON.stringify(coordinates))
        setUserAddress(formattedAddress);
        setSuccess("Location detected successfully.");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        setLocationError(
          "We do not have permission to determine your location. Please enter manually."
        );
        setTimeout(() => {
          setLocationError(null);
        }, 3000);
      }
    } catch (error) {
      console.log("error is ", error);
      if (error?.code === 1) {
        setLocationError(
          "We do not have permission to determine your location. Please enter manually."
        );
        setTimeout(() => {
          setLocationError(null);
        }, 3000);
      } else {
        setLocationError("An error occurred while detecting your location.");
      }
    }
  }


  const handleLocationDetection = async () => {
    try {
      setLocationError(null);
      setSuccess(null);
      const coordinates = await getUserCoordinates();
      fetchLocationUsingCoordinates(coordinates)
    }
    catch {
      setLocationError("An error occurred while detecting your location.");
    }
  };

  return (
    <>
      {isClient && (
        <Dialog defaultOpen={showModal}>
          <DialogTrigger asChild>
            <div>
              <button
                variant="link"
                className={`w-full bg-transparent flex items-center text-[13px] border-none justify-center px-0 py-0
               font-medium ${userAddress
                    ? "text-black  hover:bg-transparent hover:text-black"
                    : " text-black hover:bg-transparent hover:text-gray-500"
                  }`}
              >
                {userAddress
                  ? userAddress.split(",").slice(-2, -1)[0].trim()
                  : "Location"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {userAddress !== null ? "Your Location" : "Detect Location"}
              </DialogTitle>
              <DialogDescription>
                {userAddress !== null
                  ? userAddress
                  : "Enter your location to get started."}
              </DialogDescription>
            </DialogHeader>
            {userAddress === null ? (
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center flex-col md:flex-row">
                    <Button
                      onClick={handleLocationDetection}
                      className="bg-green-700 w-full md:flex-1 text-white font-normal tracking-wide hover:bg-green-700"
                    >
                      Detect my location
                    </Button>
                    <p className=" text-black font-bold text-center">OR</p>
                    <div className="relative w-full">
                      <Input
                        type="search"
                        id="location"
                        defaultValue={userAddress}
                        placeholder="Enter your location"
                        className="col-span-3 flex-1"
                        onChange={((e) => setSearchboxQuery(e.target.value))}
                        autoComplete="off"
                      />
                      {/* Location Search Result  */}
                      <div className="absolute w-full bg-white mt-3" onClick={(e) => { if (e.target.tagName == 'P') fetchLocationUsingCoordinates(e.target.dataset) }}>
                        {isError && <span className="text-xs text-red-600">Unable to get Locations</span>}
                        {SearchboxQuery.length > 2 && isLoading && <LocationSearchSkeletion />}
                        {SearchboxQuery.length > 2 && data && <PrintLocationSearchResult datas={data} />}
                      </div>
                    </div>
                  </div>
                  {locationError ? (
                    <p className="text-red-500 text-[12px] text-left">
                      {locationError}
                    </p>
                  ) : null}

                  {success ? (
                    <p className="text-green-600 text-[12px] w-full">
                      {success}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <></>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LocationAccess;
