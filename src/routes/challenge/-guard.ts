import type { Guard } from 'svelte-guard';
export const guard: Guard = async ({ locals }) => {
    return true;//$isAuthenticated
};