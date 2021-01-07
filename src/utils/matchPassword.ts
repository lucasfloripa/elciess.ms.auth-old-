import bcrypt from 'bcrypt'

const matchPassword = async (enteredPassword: string, userPassword: string) => {
  return await bcrypt.compare(enteredPassword, userPassword)
}

export { matchPassword }
