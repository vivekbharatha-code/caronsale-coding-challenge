/**
 * Interface to define Vehicle damage details
 */
export default interface IVehicleDamage {
    location: number;
    type: number;
    description: string;
    urlToImage: string;
    _fk_associatedVehicle: number;
    _fk_uuid_vehicle: string;
    id: number;
    uuid: string;
}