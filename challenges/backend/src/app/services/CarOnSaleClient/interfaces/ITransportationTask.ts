/**
 * Interface to define transportation task
 */
export default interface ITransportationTask {
    id: number;
    netPrice: number;
    grossPrice: number;
    state: number;
    _fk_associatedAuction: number;
    _fk_associatedBuyer: number;
    createdAt: string;
    updatedAt: string;
    distanceInKm: number;
    internalNetPrice: number;
    bookedAt: string;
    _fk_transportationProvider: string;
    assignedAt: string;
    urlToHandoverProtocolDocument: string;
    discountedNetPrice: number;
    invoiceReference: string;
    _fk_uuid_auction: string;
    _fk_uuid_buyerUser: string;
    _fk_uuid_transportationProvider: string;
    uuid: string;
    earliestPickupDate: string;
    note: string;
    _fk_associatedSeller: string;
    _fk_uuid_sellerUser: string;
    _fk_associatedVehicle: string;
    _fk_uuid_associatedVehicle: string;
    fromLocationAddressLine: string;
    fromLocationCity: string;
    fromLocationZipCode: string;
    fromLocationCountryCode: string;
    toLocationAddressLine: string;
    toLocationCity: string;
    toLocationZipCode: string;
    toLocationCountryCode: string;
}