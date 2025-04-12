export const AutoMarket = {
    SPOT_OCCUPIED: "[SERVER] This spot is occupied by other player.",
    NOT_OWNER: "[SERVER] You are not the owner of this vehicle.",
    TOO_HIGH_COST: "[SERVER] The cost of your vehicle is too high.",
    INVALID_COST: "[SERVER] The cost of your vehicle is invalid.",
    VEHICLE_REQUIRED: "[SERVER] You must be in the your vehicle.",

    SALE_SET: "[SERVER] Vehicle has been set. Price: $ %.",
    SALE_BOUGHT: "[SERVER] You bought the vehicle [%].",

    COMMANDS: {
        SELL: "[SERVER] Type /sell <cost>",
        BUY: "[SERVER] Type /buy",
    },

    INFO: {
        UPDATED_MARKERS: "[SERVER] Markers [%] have been updated.",
        GENERATED_MARKERS: "[SERVER] Markers [%] have been generated.",
        GENERATED_COLSHAPES: "[SERVER] Colshapes [%] have been generated.",

        NO_EXISTS_MARKER: "[SERVER] Marker #% is not exists.",
        NO_EXISTS_COLSHAPE: "[SERVER] Colshape #% is not exists.",
        NO_MARKERS: "[SERVER] No markers for being destroyed.",
        NO_COLSHAPES: "[SERVER] No colshapes for being destroyed",

        DESTROYED_MARKERS: "[SERVER] Markers [%] have been destroyed.",
        DESTROYED_COLSHAPES: "[SERVER] Colshapes [%] have been destroyed.",

        DESTROYED_MARKER: "[SERVER] Marker #% has been destroyed.",
        DESTROYED_COLSHAPE: "[SERVER] Colshape #% has been destroyed.",

        GENERATED_VEHICLES: "[SERVER] Vehicles [%] have been generated."
    },

    ERRORS: {
        INVALID_SPOT: "[SERVER] Invalid Spot",
    }
}

export const Balance = {
    NO_MONEY: "[SERVER] You have no money for this purchase.",
    MORE_MONEY: "[SERVER] You need more money for this purchase.",
    WALLET: "[SERVER] Your balance: $ %."
}