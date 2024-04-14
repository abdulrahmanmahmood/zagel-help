"use client";
import React, { useEffect, useState } from "react";
import Navheader from "../_components/Navheader";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import redIcon from "../../public/location.png";
import greenIcon from "../../public/gps.png";
import OrangeIcon from "../../public/placeholder.png";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import axios from "axios"; // Import Axios for HTTP requests
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const page = () => {
  const position = [19.999208860791935, 42.60094642639161]; // Default position

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  );
  console.log("toke from setAddress",token);

  // State variables for form data and selected position
  const [formData, setFormData] = useState({
    name: "",
    contactNumbers: "",
    requestType: "",
    executingEntity: "",
  });
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Event listener to capture click events on the map
  const LocationFinder = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng); // Update selected position
      },
    });
    return null;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        name: formData.name,
        contactNumbers: formData.contactNumbers,
        requestType: formData.requestType,
        longitude: selectedPosition.lng,
        latitude: selectedPosition.lat,
        executingEntity: formData.executingEntity,
      };
      console.log("Sending data:", dataToSend);

      // Send the form data to the endpoint using Axios
      const response = await axios.post(
        "http://jazlhelp.runasp.net/api/Content",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
          },
        }
      );

      console.log("Data sent successfully:", response.data);
      // Reset form data and selected position after successful submission
      setFormData({ name: "", contactNumbers: "", requestType: "" });

      setSelectedPosition(null);
      alert("تم إضافة الحالة بنجاح 👍");
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle errors here
      alert("خطأ في ", error.message ? error.message : error);
    }
  };

  // Function to get marker icon based on data
  const getMarkerIcon = (data) => {
    if (data === "لم يتم المعالجة") {
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "تم المعالجة") {
      return new Icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "جاري المعالجة") {
      return new Icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    }
  };

  return (
    <div className="w-full bg-[#ceb99c] h-[100vh]   p-0 m-0">
      <Navheader />
      <h1 className="text-2xl font-bold text-center mt-4">إضافة حالة جديدة</h1>

      <div className="w-[97%] justify-between gap-3 flex flex-col  lg:flex-row  mx-auto mt-4">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <LocationFinder />
          {selectedPosition && (
            <Marker
              position={selectedPosition}
              // icon={getMarkerIcon("تم المعالجة")} // Change marker icon based on data
            >
              <Popup>Selected Position</Popup>
            </Marker>
          )}
        </MapContainer>

        <div className="w-full lg:max-w-md mx-auto  p-4 border bg-[#9d9273]  border-gray-300 rounded-md">
          {selectedPosition ? (
            <form
              onSubmit={handleSubmit}
              style={{
                // backgroundImage: `url(${backgroundImage})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNumbers"
                  className="block text-sm font-medium text-white"
                >
                  رقم الاتصال
                </label>
                <input
                  type="text"
                  id="contactNumbers"
                  name="contactNumbers"
                  value={formData.contactNumbers}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumbers: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="requestType"
                  className="block text-sm font-medium text-white"
                >
                  نوع الحالة
                </label>
                <input
                  type="text"
                  id="requestType"
                  name="requestType"
                  value={formData.requestType}
                  onChange={(e) =>
                    setFormData({ ...formData, requestType: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="executingEntity"
                  className="block text-sm font-medium text-white"
                >
                  الجهة المنفذة
                </label>
                <input
                  type="text"
                  id="executingEntity"
                  name="executingEntity"
                  value={formData.executingEntity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      executingEntity: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#b8b39c] text-white py-2 px-4 rounded-md hover:bg[#b8b39c]                "
              >
                إضافة حالة
              </button>{" "}
            </form>
          ) : (
            <div className="mt-[40%] text-center">
              <h1 className="my-auto ">إختر مكان الحالة ثم ادخل البيانات </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
