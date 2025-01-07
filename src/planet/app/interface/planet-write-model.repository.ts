export interface CreateParams {
  name: string;
}

export interface UpdateParams {
  id: string;
  name?: string;
}

export interface DeleteParams {
  id: string;
}

export abstract class PlanetWriteModelRepository {
  public abstract create(params: CreateParams): Promise<boolean>;
  public abstract update(params: UpdateParams): Promise<boolean>;
  public abstract delete(params: DeleteParams): Promise<boolean>;
}
