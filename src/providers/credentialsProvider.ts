export interface TdaCredential {
  access_token: string;
  refresh_token: string;
  scope?: string;
  expires_in: number;
  refresh_token_expires_in: number;
  token_type?: string;
  modified_date?: number;
  client_id: string;
  redirect_uri?: string;
}

export interface CredentialProvider {
  getCredential(): Promise<TdaCredential>;

  updateCredential(tdaCredential: TdaCredential): Promise<void>;
}
