"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="w-full text-center py-8">
      <div className="inline-block animate-spin border-4 border-gray-300 border-t-primary rounded-full w-10 h-10" />
      <p className="mt-2 text-sm">Cargando...</p>
    </div>
  );
}
