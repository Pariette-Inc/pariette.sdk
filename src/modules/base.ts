import { ParietteClient } from '../client'

export abstract class BaseModule {
  constructor(protected client: ParietteClient) {}
}
