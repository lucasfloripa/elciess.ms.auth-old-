class User {
  public readonly id: string
  public email: string
  public password: string

  constructor (props: Partial<User>) {
    Object.assign(this, props)
  }
}

export { User }
