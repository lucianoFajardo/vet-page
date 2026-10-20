
export type dayhour = {
  open: boolean;
  aperture?: string; // Formato "HH:MM" (ej. "09:00")
  close?: string; // Formato "HH:MM" (ej. "18:30")
};

// 0 = Domingo, 1 = Lunes, 2 = Martes, ..., 6 = Sábado
export type weekhour = Record<number, dayhour>;

export function verifiHourLocal(hours: weekhour): {
  isOpen: boolean;
  hourOpenString: string;
} {
  // Aseguramos que la fecha y hora se calculen basadas en la ubicación del local (chile)
  const zonaHour = "America/Santiago";

  // Obtenemos un objeto Date ajustado a la zona horaria del lugar aqui seria agrego chile
  const localDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: zonaHour }),
  );

  const DayNow = localDate.getDay();
  const hoursNow = localDate.getHours().toString().padStart(2, "0");
  const minute = localDate.getMinutes().toString().padStart(2, "0");
  const hourActualStr = `${hoursNow}:${minute}`;

  const horarytoday = hours[DayNow];

  // Si no hay horario definido, está explícitamente cerrado, o faltan datos
  if (
    !horarytoday ||
    !horarytoday.open ||
    !horarytoday.aperture ||
    !horarytoday.close
  ) {
    return { isOpen: false, hourOpenString: hourActualStr };
  }
  // Comparación alfabética directa de strings "HH:MM"
  const isOpen =
    hourActualStr >= horarytoday.aperture && hourActualStr <= horarytoday.close;
  return { isOpen, hourOpenString: hourActualStr };
}
