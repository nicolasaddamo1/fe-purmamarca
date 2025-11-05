"use client";

import { Skeleton } from "antd";
import React from "react";

export default function ProductPageSkeleton() {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl animate-pulse">
      <div className="gap-10 md:gap-16 grid grid-cols-1 md:grid-cols-2">
        <div className="flex md:flex-row flex-col-reverse gap-4">
          <div className="flex flex-row md:flex-col gap-3 md:gap-4 md:w-24 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <Skeleton.Node
                key={i}
                active
                className="!rounded-md !w-16 md:!w-24 !h-16 md:!h-24"
              />
            ))}
          </div>

          {/* Imagen Principal */}
          <div className="flex flex-1 justify-center md:justify-start">
            <div className="relative bg-primary/10 rounded-lg w-full max-w-[420px] max-h-[450px] aspect-square overflow-hidden">
              <Skeleton.Node
                active
                className="!absolute !inset-0 !rounded-lg !w-full !h-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-6">
          <Skeleton.Input active size="large" className="!w-3/4 !h-8" />

          <Skeleton.Input active size="large" className="!w-1/3 !h-8" />

          <div className="flex items-center gap-3 mt-2">
            <Skeleton.Input active size="small" className="!w-20 !h-8" />
            <Skeleton.Button active size="small" className="!w-32 !h-8" />
          </div>

          <Skeleton.Button
            active
            size="large"
            shape="round"
            className="!w-full !h-12"
          />

          <Skeleton
            paragraph={{ rows: 5, width: ["100%", "95%", "90%", "80%"] }}
            active
          />

          <div className="flex flex-wrap gap-3 mt-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton.Button
                key={i}
                active
                className="!rounded-lg !w-24 !h-8"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
