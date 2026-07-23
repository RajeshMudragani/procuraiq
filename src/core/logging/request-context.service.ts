import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  correlationId: string;
  tenantId?: string;
  userId?: string;
}

@Injectable()
export class RequestContextService {
  private readonly asyncLocalStorage =
    new AsyncLocalStorage<RequestContext>();

  run(
    context: RequestContext,
    callback: () => void,
  ): void {
    this.asyncLocalStorage.run(
      context,
      callback,
    );
  }

  getContext():
    | RequestContext
    | undefined {
    return this.asyncLocalStorage.getStore();
  }
}