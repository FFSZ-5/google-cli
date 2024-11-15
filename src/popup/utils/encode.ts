import { GetLoginStamp } from "../services";
import { JSEncrypt } from "jsencrypt";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC51ywBVBF899Rt6brFw1x4jM8b
  /VzqEq+sqK2m1CYPZJEJuHvJWeNjksZLSf9olOU1cu48dIdVNHUGa0vVZfTggP0d
  GeCtKDbLiwzM0jEBy7kbPhDT1wCB/nZCY1hxWBhd7o3vnJX8pGsEvytaw+nSVkLm
  xHsnQpbgspUG8cMEmwIDAQAB
  -----END PUBLIC KEY-----`;
const rsaEncryptor = new JSEncrypt();
rsaEncryptor.setPublicKey(PUBLIC_KEY);
export const encodePassword = async (password: string, password2?: string) => {
  const { data } = (await GetLoginStamp.get()) ?? {};
  const { stamp } = data ?? {};
  if (stamp) {
    const newPassword = rsaEncryptor.encrypt(stamp + password);
    if (password2) {
      return {
        password: newPassword,
        password2: rsaEncryptor.encrypt(stamp + password2),
        stamp,
      };
    }
    return { password: newPassword, stamp };
  }
  return {};
};
