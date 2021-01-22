import { AxiosResponse } from 'axios'
import { UserAdmin } from 'api/types/Models'

export declare namespace ApiFunction {
  export interface login {
    (params: { username: string; password: string }): Promise<
      AxiosResponse<{ token: string } & { user: Pick<UserAdmin.Fields, 'id' | 'name' | 'email'> }>
    >
  }

  export interface updateUser {
    (params: {
      id: number
      data: UserAdmin.Fillable & { confirmPassword: string; oldPassword: string }
    }): Promise<
      AxiosResponse<{ message: string; user: Pick<UserAdmin.Fields, 'id' | 'name' | 'email'> }>
    >
  }
}
