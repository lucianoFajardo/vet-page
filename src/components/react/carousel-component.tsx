"use client";

import * as React from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import petDog from "../../assets/pet-dog.png";
import petCat from "../../assets/pet-cat.png";
import medicalClinical from "../../assets/medical-clinical.png";

const slides = [
  {
    badge: "Quirófano ",
    title: "Quirófano moderno y monitorización multiparamétrica",
    thumb: "Medicina Canina",
    img: petDog,
    thumbDesc: "Revisión periódica",
    gradient: "from-emerald-200 to-emerald-800",
  },
  {
    badge: "Medicina Felina",
    title: "Espacios tranquilos y libres de estrés para gatos",
    thumb: "Área Felina",
    img: petCat,
    thumbDesc: "Atención sin estrés",
    gradient: "from-teal-100 to-emerald-700",
  },
  {
    badge: "Cirugía Avanzada",
    title: "Cirugía avanzada con anestesia gaseosa segura",
    thumb: "Quirófano",
    img: medicalClinical,
    thumbDesc: "Cirugía avanzada",
    gradient: "from-slate-300 to-emerald-900",
  },
];

export default function CarouselComponent() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    const intervalId = window.setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(intervalId);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <div className="overflow-hidden rounded-2xl shadow-surface-2">
          <CarouselContent className="ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div
                  className={`relative flex aspect-16/10 items-end bg-linear-to-b ${slide.gradient}`}
                >
                  <img
                    src={slide.img.src}
                    alt={slide.title}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                  />
                  <div className="relative z-10 w-full bg-linear-to-t from-slate-900/70 to-transparent p-5 pt-16 text-white">
                    <span className="inline-block rounded-full bg-mint-foam px-2.5 py-0.5 text-[0.6875rem] font-bold text-evergreen">
                      {slide.badge}
                    </span>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-lg leading-6 font-semibold">
                        {slide.title}
                      </p>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20">
                        <Camera size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {[
            {
              label: "Anterior",
              Icon: ChevronLeft,
              onClick: () => api?.scrollPrev(),
            },
            {
              label: "Siguiente",
              Icon: ChevronRight,
              onClick: () => api?.scrollNext(),
            },
          ].map(({ label, Icon, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              className="grid size-8 place-items-center rounded-full bg-white/90 text-ink shadow-surface-1 transition hover:bg-white"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
