import { sign, SignOptions, verify } from "jsonwebtoken";

interface TokenPayload {
  username: string;
  accessTypes: string[];
}

export function generateToken(username: string) {
  const payload: TokenPayload = {
    username: username,
    accessTypes: ["find", "update", "delete", "show"],
  };

  // reading secret key value
  const signOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };

  return sign(payload, process.env.SECRET_KEY || "secret", signOptions);
}

export function validateToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    const decoded = verify(
      token,
      process.env.SECRET_KEY || "secret"
    ) as TokenPayload;
    if (!decoded.username) return reject("Error in decoding");
    console.log("Decoded", decoded);
    resolve(decoded as TokenPayload);
  });
}
