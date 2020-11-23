import { Iva } from "./Iva";
import { Ingredienti } from "./Ingredienti";
import { FamAssort } from "./FamAssort";
import { Barcode } from "./Barcode";


export class Articoli {

  constructor(
    public codArt: string,
    public descrizione: string,
    public um: string,
    public codStat: string,
    public pzCart: number,
    public pesoNetto: number,
    public prezzo: number,
    public idStatoArt: string,
    public dataCreaz: Date,
    public barcode: Barcode,
    public famAssort: FamAssort,
    public ingredienti: Ingredienti,
    public iva: Iva

  ) { }

}