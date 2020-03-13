/**
 * Interface to define Vehicle image details
 */
export default interface IVehicleImage {
    rawData: any;
    url: string;
    uuid?: string;
    _fk_associatedVehicle: number;
    _fk_uuid_vehicle: string;
    perspective: number;
    encoding: string;
    mimeType: string;
}