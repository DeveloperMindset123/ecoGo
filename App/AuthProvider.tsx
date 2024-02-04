import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([
    {
      latitude: 40.80845083845422,
      longitude: -73.96097145974636,
    },
    {
      latitude: 40.809450938704046,
      longitude: -73.95625445991755,
    },
    {
      latitude: 40.81113617883823,
      longitude: -73.95771760493516,
    },
  ]);
  const [events, setEvents] = useState<any>([
    {
      id: 1,
      title: "Curbside Garbage",
      description: "Some stuff fell out of a truck pls help us clean it up",
      marker: {
        latitude: 40.80845083845422,
        longitude: -73.96097145974636,
      },
    },
    {
      id: 2,
      title: "Some campus littering",
      description: "people needa clean up after themselves",
      marker: {
        latitude: 40.809450938704046,
        longitude: -73.95625445991755,
      },
    },
    {
      id: 3,
      title: "random things on trees",
      description: "please help",
      marker: {
        latitude: 40.81113617883823,
        longitude: -73.95771760493516,
      },
    },
  ]);

  //   Uses

  return (
    <AuthContext.Provider
      // provides it to the rest of the application
      value={{
        user,
        setUser,
        markers,
        setMarkers,
        events,
        setEvents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
