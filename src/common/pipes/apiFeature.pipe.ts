import { PipeTransform, Injectable } from '@nestjs/common';
import { BaseQuery } from '../types/baseQuery.type';
import { FindOptions } from 'sequelize';
import { ApiFeatures } from '../utils/apiFeature';

@Injectable()
export class ApiFeaturesPipe implements PipeTransform {
  transform(value: Partial<BaseQuery>): FindOptions {
    const api = new ApiFeatures(value);
    return api.filter().sort().paginate().build();
  }
}
