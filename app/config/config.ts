import dotenv from "dotenv";


dotenv.config();

interface ConfigData {
  port: number;
  accessTokenSecretKey: string;
}

const {
  PORT,
  ACCESS_TOKEN_SECRET_KEY
} = process.env;


if (
  !ACCESS_TOKEN_SECRET_KEY
) {
  throw new Error(
    "Missing required environment variables. Please check your .env file.",
  );
}

export const configData: ConfigData = {
  port: parseInt(PORT as string, 10),
  accessTokenSecretKey: ACCESS_TOKEN_SECRET_KEY
};
