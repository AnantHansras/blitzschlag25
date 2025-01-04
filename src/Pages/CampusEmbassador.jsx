import React from 'react';
import campusImg from "../Assets/campus.jpg";

const CampusEmbassador = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${campusImg})`,
      }}
    >
      {/* Optional: Add content inside */}
      <div 
        style={{ fontFamily: '"Amarante", serif' }}
        className="h-full w-full flex items-center justify-center bg-black bg-opacity-50 text-white">
        <h1 className="text-lg font-bold">Campus Embassador</h1>
      </div>
    </div>
  );
};

export default CampusEmbassador;
