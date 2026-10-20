// src/components/react/IndicadorHorario.tsx
import { useEffect, useState } from 'react';
import { verifiHourLocal } from '@/components/ts/open-close-vet';

// Esto lo puedes importar de tu data.json si lo prefieres
const HOURS_VETPET = {
  0: { open: false }, // Domingo cerrado
  1: { open: true, aperture: "09:00", close: "19:00" }, // Lunes
  2: { open: true, aperture: "09:00", close: "19:00" }, // Martes
  3: { open: true, aperture: "09:00", close: "19:00" }, // Miércoles
  4: { open: true, aperture: "09:00", close: "19:00" }, // Jueves
  5: { open: true, aperture: "09:00", close: "19:00" }, // Viernes
  6: { open: true, aperture: "10:00", close: "14:00" }, // Sábado
};

export default function IndicadorHorario() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificamos el estado al cargar el componente
    const checkStatus = () => {
      const { isOpen  } = verifiHourLocal(HOURS_VETPET);
      setIsOpen(isOpen);
    };
    checkStatus();
    // Opcional: Actualizar automáticamente cada minuto por si el usuario deja la pestaña abierta
    const intervalo = setInterval(checkStatus, 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Evita renderizar nada hasta que el cliente determine la hora para evitar "flickering"
  if (isOpen === null) return <div className="h-6 w-24 animate-pulse bg-gray-200 rounded-full"></div>;

  return (
    <div className="flex items-center gap-2 font-medium">
      <span className="relative flex h-3 w-3">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-green-500 animate-ping' : 'bg-red-500 animate-ping '}`}></span>
      </span>
      <span className={isOpen ? 'text-green-700 bg-green-100 px-2 py-1 rounded-full' : 'text-red-700 bg-red-100 px-2 py-1 rounded-full'}>
        {isOpen ? `Abierto ahora hasta 20:00 hrs` : 'Cerrado en este momento'}
      </span>
    </div>
  );
}