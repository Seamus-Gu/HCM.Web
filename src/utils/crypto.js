import JSEncrypt from 'jsencrypt'

export function rsaEnCrypt(str) {
  const encrypt = new JSEncrypt()
  const publicKey = import.meta.env.VITE_PUBLIC_KEY

  encrypt.setPublicKey(publicKey)
  const encrypted = encrypt.encrypt(str)

  return encrypted.toString()
}
