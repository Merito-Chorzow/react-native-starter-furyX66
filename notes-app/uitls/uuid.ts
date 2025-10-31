import { randomUUID } from 'expo-crypto';

export const generateUUID = (): string => {
    return randomUUID();
};