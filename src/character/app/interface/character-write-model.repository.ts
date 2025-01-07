export interface CreateParams {
  name: string;
  episodesIds?: string[];
  planetId?: string;
}

export interface UpdateParams {
  id: string;
  name?: string;
  episodesIds?: string[];
  planetId?: string;
}

export interface DeleteParams {
  id: string;
}

export abstract class CharacterWriteModelRepository {
  public abstract create(params: CreateParams): Promise<boolean>;
  public abstract update(params: UpdateParams): Promise<boolean>;
  public abstract delete(params: DeleteParams): Promise<boolean>;
}
