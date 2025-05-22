import { PipeTransform, Injectable } from '@nestjs/common';
import { BaseQuery } from '../types/baseQuery.type';
import { FindOptions } from 'sequelize';
import { ApiFeatures } from '../utils/apiFeature';

@Injectable()
export class ApiFeaturesPipe implements PipeTransform {
  transform(value: Partial<BaseQuery>): FindOptions {
    const { filters = {}, ...queryOptions } = value;

    const api = new ApiFeatures(queryOptions);

    const options = api.filter(filters).sort().paginate().build();

    return options;
  }
}
