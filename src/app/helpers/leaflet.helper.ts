export class LeafletHelper {
  private static leaflet: any;

  /**
   * Importa o Leaflet dinamicamente no lado do cliente.
   * @returns Uma Promise com a instância do Leaflet.
   */
  static async getLeaflet(): Promise<any> {
    if (!LeafletHelper.leaflet) {
      // Importa o Leaflet apenas no lado do cliente
      if (typeof window !== 'undefined') {
        LeafletHelper.leaflet = await import('leaflet');
      } else {
        throw new Error('Leaflet cannot be loaded in a server-side context.');
      }
    }
    return LeafletHelper.leaflet;
  }
}
