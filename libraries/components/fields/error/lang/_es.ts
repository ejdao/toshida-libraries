export const es: any = {
  minLengthMsg: (length: number) => `El campo contiene menos de ${length} caracteres`,
  maxLengthMsg: (length: number) => `El campo contiene mas de ${length} caracteres`,
  minMsg: (min: number) => `El numero debe ser mayor a ${min}`,
  maxMsg: (max: number) => `El numero debe ser menor a ${max}`,
  patternMsg: 'Uno o mas caracteres no permitidos',
  requiredMsg: 'Este campo es requerido',
  EmailMsg: 'Este campo debe ser un email',
  onlyNumberMsg: 'Este campo debe ser numerico',
  badDateMsg: 'Inserte una fecha valida',
  DateRangeMsg: 'El rango no es valido',
};
