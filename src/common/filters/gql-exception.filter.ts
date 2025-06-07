import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GeneralGqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let message = 'Internal server error';
    let status = 500;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || message;
      status = exception.getStatus();
    } else {
      console.error('Unhandled Exception:', exception);
      message =
        exception instanceof Error
          ? exception.message
          : 'Unexpected server error';
    }

    return new GraphQLError(message, {
      extensions: {
        code: status,
      },
    });
  }
}
