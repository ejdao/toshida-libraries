import { MatDatepickerIntl } from '@toshida/material/datepicker';

export function getSpanishMatDatePickerIntl() {
  const datePickerIntl = new MatDatepickerIntl();
  datePickerIntl.nextMonthLabel = 'Siguiente mes';
  datePickerIntl.prevMonthLabel = 'Anterior mes';
  datePickerIntl.prevMultiYearLabel = 'Anteriores 24 años';
  datePickerIntl.nextMultiYearLabel = 'Siguientes 24 años';
  return datePickerIntl;
}
