import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config({path: '.env.local', override: true});
const config: CodegenConfig = {
  schema: process.env.VITE_SERVER_HOST || 'http://localhost:4000/graphql',
  documents: "src/**/*.tsx",
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
