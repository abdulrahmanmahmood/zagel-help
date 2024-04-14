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
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package

const page = () => {
  const position = [19.999208860791935, 42.60094642639161]; // Default position
  const [persons, setPersons] = useState([]); // State variable to hold persons data

  const fetchPersons = async () => {
    if (typeof window !== "undefined") {
      try {
        const response = await axios.get(
          "http://jazlhelp.runasp.net/api/content"
        );
        setPersons(response.data);
        console.log("success fetching the data", response.data);
      } catch (error) {
        console.error("Error fetching persons data:", error);
        // Handle errors here
      }
    }
  };
  const handleDelete = async (id) => {
    if (typeof window !== "undefined") {
      try {
        await axios.delete(`http://jazlhelp.runasp.net/api/content/${id}`);
        console.log("Person deleted successfully!");
        // Update state or refetch data if necessary
        fetchPersons();
      } catch (error) {
        console.error("Error deleting person:", error);
        // Handle errors here
      }
    }
  };

  useEffect(() => {
    fetchPersons();
    return () => {
      // Cleanup function to remove markers when component unmounts
      setPersons([]); // Clear persons state
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Define your markers data here
      const markersData = [
        {
          position: [19.984701088274022, 42.64470151140049],
          name: "الحج محمد شيبوب",
          executingEntity: "جمعية رجال من اجل النساء",
          requestType: "مقبولة",
          contactNumbers: "011223423432",
          id: 1,
        },
        {
          position: [20.006824179975645, 42.60595448715381],
          name: "الحج عبدالله شيبوب",
          executingEntity: "جمعية عايشين بكرم الله",
          requestType: "جيدة",
          contactNumbers: "011223423432",
          id: 2,
        },
        {
          position: [19.99674858831157, 42.60153434796344],
          name: "الحج علي شيبوب",
          executingEntity: "جمعية كلنا اخوة",
          requestType: "جامد طحن",
          contactNumbers: "011223423432",
          id: 3,
        },
      ];

      setMarkers(markersData);
    }
  }, []);

  const getMarkerIcon = (data) => {
    if (data === "لم يتم المعالجة") {
      return L.icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "تم المعالجة") {
      return L.icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "جاري المعالجة") {
      return L.icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    } else {
      return L.icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    }
  };

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from Redux state
  console.log(
    `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
  );

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };
  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

  return (
    <div className="w-full bg-[#ceb99c] h-[100vh] p-0 m-0 ">
      <Navheader />
      <h1 className="text-4xl font-bold text-center mt-4">جميع الحالات</h1>
      <div className="w-[90%] h-[70vh] mx-auto  border-2 border-blue-500">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "520px", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />{" "}
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {persons &&
            persons.map((person, index) => (
              <Marker
                key={index}
                position={[person.latitude, person.longitude]}
                icon={getMarkerIcon(person.color)}
                // img={getMarkerIcon(person.coor)}
              >
                <Popup>
                  <table className="table-auto border-[1.5px] border-black text-right w-[200px] h-[150px]">
                    <tbody className="border-[1.5px] border-black">
                      <tr className="border-[1.5px] border-black">
                        <td className="border-[1.5px] border-black p-1">
                          {person.name || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          الاسم:
                        </td>
                      </tr>
                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.executingEntity || "N/A"}
                        </td>

                        <td className="border-[1.5px] border-black p-1">
                          الجهة المنفذة
                        </td>
                      </tr>
                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.requestType || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          :نوع الحالة
                        </td>
                      </tr>
                      <tr>
                        <td className="border-[1.5px] border-black p-1">
                          {person.contactNumbers || "N/A"}
                        </td>
                        <td className="border-[1.5px] border-black p-1">
                          :رقم الاتصال
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center">
                    <button className="text-blue-500 cursor-pointer p-1 m-1 ">
                      تعديل هذه الحالة
                    </button>
                    <button
                      className="text-red-500 cursor-pointer ml-4 p-1 m-1"
                      onClick={() => handleDelete(person.id)}
                    >
                      مسح هذه الحالة
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              // icon={getMarkerIcon(marker.data)}
            >
              <Popup>
                <table className="table-auto border-[1.5px] border-black text-right w-[200px] h-[150px]">
                  <tbody className="border-[1.5px] border-black">
                    <tr className="border-[1.5px] border-black">
                      <td className="border-[1.5px] border-black p-1">
                        {marker.name || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        الاسم:
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.executingEntity || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        الجهة المنفذة
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.requestType || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        :نوع الحالة
                      </td>
                    </tr>
                    <tr>
                      <td className="border-[1.5px] border-black p-1">
                        {marker.contactNumbers || "N/A"}
                      </td>
                      <td className="border-[1.5px] border-black p-1">
                        :رقم الاتصال
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center">
                  <button className="text-blue-500 cursor-pointer p-1 m-1">
                    تعديل هذه الحالة
                  </button>
                  <button
                    className="text-red-500 cursor-pointer ml-4 p-1 m-1"
                    onClick={() => handleDelete(marker.id)}
                  >
                    مسح هذه الحالة
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          {/* <LocationFinderDummy /> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default page;
