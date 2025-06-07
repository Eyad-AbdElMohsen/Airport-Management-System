import { FindOptions } from 'sequelize';
import { BaseQuery } from '../types/baseQuery.type';

export class ApiFeatures {
  private queryOptions: FindOptions = {};
  private queryString: BaseQuery;

  constructor(queryString: Partial<BaseQuery>) {
    this.queryString = {
      page: queryString.page ?? 1,
      limit: queryString.limit ?? 10,
      sort: queryString.sort ?? '-createdAt',
      filters: queryString.filters ?? {},
    };
  }

  filter() {
    this.queryOptions.where = { ...this.queryString.filters };
    return this;
  }

  sort() {
    const sortBy = this.queryString.sort;
    const sortedFields: any[] = [];

    sortBy.split(',').forEach((field) => {
      if (field.startsWith('-')) {
        sortedFields.push([field.substring(1), 'DESC']);
      } else {
        sortedFields.push([field, 'ASC']);
      }
    });

    this.queryOptions.order = sortedFields;
    return this;
  }

  paginate() {
    const { page, limit } = this.queryString;
    const skip = (page - 1) * limit;

    this.queryOptions.limit = limit;
    this.queryOptions.offset = skip;
    return this;
  }

  build() {
    return this.queryOptions;
  }
}
