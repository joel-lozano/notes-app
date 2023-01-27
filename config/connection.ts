import * as dotenv from 'dotenv';
import getSecret from './keyvault';

dotenv.config();

async function putKeyVaultSecretInEnvVar() {
    const secretName = process.env.KEY_VAULT_SECRET_NAME_DATABASE_URL;
    const keyVaultName = process.env.KEY_VAULT_NAME;

    if (!secretName || !keyVaultName) {
        throw new Error('getSecret: Required params missing');
    }

    const connectionString = await getSecret(secretName, keyVaultName);
    process.env.DATABASE_URL = connectionString;
}

async function getConnectionInfo() {
    if (!process.env.DATABASE_URL) {
        await putKeyVaultSecretInEnvVar();

        // Still no database url
        if (!process.env.DATABASE_URL) {
            throw new Error('No environment variable set for database url.');
        }
    }

    const DATABASE_NAME = process.env.DATABASE_NAME || 'azure-notes-app';

    return {
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_NAME: process.env.DATABASE_NAME
    }
}

export default getConnectionInfo;