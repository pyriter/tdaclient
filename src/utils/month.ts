import { Month } from '../models/optionChain';

export function convertToMonth(month: number) {
  switch (month) {
    case 0:
      return Month.JAN;
    case 1:
      return Month.FEB;
    case 2:
      return Month.MAR;
    case 3:
      return Month.APR;
    case 4:
      return Month.MAY;
    case 5:
      return Month.JUN;
    case 6:
      return Month.JUL;
    case 7:
      return Month.AUG;
    case 8:
      return Month.SEP;
    case 9:
      return Month.OCT;
    case 10:
      return Month.NOV;
    case 11:
      return Month.DEC;
  }
}
