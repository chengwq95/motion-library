declare module "virtual:sources" {
  /** React preview source code by effect id (HTML + CSS effects carry their own code). */
  const sources: Record<string, string>;
  export default sources;
}
