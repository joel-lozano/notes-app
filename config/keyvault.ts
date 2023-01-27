import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

type env = string | undefined;

export default async function getSecret(secretName: env, keyVaultName: env) {
    if (!secretName || !keyVaultName) {
        throw Error('getSecret: Required params missing');
    }

    const credential = new DefaultAzureCredential();

    // Build the URL to reach key vault
    const url = `https://${keyVaultName}.vault.azure.net`;

    try {
        // Create client to connect to service
        const client = new SecretClient(url, credential);

        // Get secret obj
        const latestSecret = await client.getSecret(secretName);

        // Return value
        return latestSecret.value;
    } catch (err: any) {
        throw err;
    }
} 