export interface User {
  firstname: string
  lastname: string
  middlename: string | null
  suffix?: string | null
}

export interface Fullname {
  (name: User): string
}

const fullname: Fullname = (user) => {
  let { firstname, lastname, middlename, suffix } = user

  return ` ${lastname}, ${firstname} ${middlename ? middlename[0] + '.' : ''} ${
    suffix ? suffix : ''
  }`.trim()

  // return `${firstname} ${middlename ? middlename[0] + '.' : ''} ${lastname} ${
  //   suffix ? suffix : ''
  // }`.trim()
}

export default fullname
