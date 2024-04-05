import { createGuardHook } from 'svelte-guard';

const guards = import.meta.glob('./routes/**/-guard.*');
export const handle = createGuardHook(guards);