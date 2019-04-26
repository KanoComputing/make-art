/*
 * Security module
 *
 * Override core objects in the language scope to evaluate in a secured scope
 */

export const window = null;
export const top = null;
export const Window = null;
export const Document = null;
export const document = null;
export const console = null;
export const alert = null;
export const addEventListener = null;
export const removeEventListener = null;
export const releaseEvents = null;
export const localStorage = null;
export const KW_SDK = null;
export const angular = null;
export const app = null;
export const $ = null;
export const open = null;
export const location = null;
export const parent = null;
export const postMessage = null;
export const print = null;
export const profile = null;
export const prompt = null;
export const requestAnimationFrame = null;
export const cancelAnimationFrame = null;
export const scroll = null;
export const scrollBy = null;
export const scrollTo = null;
export const scrollX = null;
export const scrollY = null;
export const session = null;
export const sessionStorage = null;
export const setTimeout = null;
export const setInterval = null;

export default {};