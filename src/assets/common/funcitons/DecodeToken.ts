import JwtService from "src/assets/common/jwt.service";
const Buffer = require('buffer/').Buffer

export interface tokenInterface {
  account: string | null,
  corpId: number | null,
  corpNm: string | null,
  deptId: number | null,
  deptNm: string | null,
  exp: number | null,
  id: number | null,
  name: string | null,
  position: string | null,
  role: 'ROLE_ADMIN' | 'ROLE_USER' | null,
  sub: string | null,
  authority: string | null
}

function decodeToken(): tokenInterface {
  if (JwtService.getToken()) {
    const base64Url = (JwtService.getToken() as string).split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let JSONToken = JSON.parse(decodeURIComponent(Buffer.from(base64, 'base64').toString()));

    JSONToken.corpId = Number(JSONToken.corpId);
    JSONToken.deptId = Number(JSONToken.deptId);
    JSONToken.id = Number(JSONToken.id);
    JSONToken.division = Number(JSONToken.division);

    return JSONToken;
  } else {
    return {
      account: null,
      corpId: null,
      corpNm: null,
      deptId: null,
      deptNm: null,
      exp: null,
      id: null,
      name: null,
      position: null,
      role: null,
      sub: null,
      authority: null
    };
  }
};

export default decodeToken;
