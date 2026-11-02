import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((res) => {
        
        if (res === null || res === undefined) {
          return {
            status: 'success',
            statusCode: statusCode,
            message: 'Kamyabi ke sath data mil gaya hai!',
            data: null,
          };
        }

        
        if (Array.isArray(res)) {
          return {
            status: 'success',
            statusCode: statusCode,
            message: 'Kamyabi ke sath data mil gaya hai!',
            data: res,
          };
        }

      
        
        if (typeof res === 'object' && 'message' in res) {
          const { message, ...actualData } = res;
          return {
            status: 'success',
            statusCode: statusCode,
            message: message,
            data: Object.keys(actualData).length > 0 ? actualData : null,
          };
        }

        
        return {
          status: 'success',
            statusCode: statusCode,
            message: 'Kamyabi ke sath data mil gaya hai!',
            data: res,
          };
      }),
    );
  }
}