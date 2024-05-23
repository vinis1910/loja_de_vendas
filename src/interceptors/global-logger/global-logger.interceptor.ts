import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { UserRequest } from 'src/modules/auth/interfaces/userRequest.interface';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<Request | UserRequest>();

    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;

    this.logger.log(`${method} ${path}`);

    const preControllerTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Rota acessada pelo usuario: ${request.user.sub} com nome ${request.user.userName}`)
        }
        const RouteExecutationTime = Date.now() - preControllerTime;
        this.logger.log(`Resposta: status ${statusCode} - ${RouteExecutationTime}ms`);
      })
    );
  }
}
