import { AxiosResponse } from 'axios'
import { UserAdmin } from 'api/types/Models'

export declare namespace ApiFunction {
  export interface login {
    (params: { username: string; password: string }): Promise<
      AxiosResponse<{ token: string } & { user: Pick<UserAdmin.Fields, 'id' | 'name' | 'email'> }>
    >
  }
}
