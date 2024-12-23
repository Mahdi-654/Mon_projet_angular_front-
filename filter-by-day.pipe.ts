// src/app/filter-by-day.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Training } from './models/training.models';
import moment from 'moment';

@Pipe({
  name: 'filterByDay'
})
export class FilterByDayPipe implements PipeTransform {
  transform(trainings: Training[], day: string): Training[] {
    return trainings.filter(training =>
      moment(training.date).format('dddd') === day
    );
  }
}
