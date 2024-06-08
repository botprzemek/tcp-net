export type Config = {
    quarter : {
        amount: number;
        length: number;
    }
};

const config: Config = {
    quarter: {
        amount: 4,
        length: 6000, //600000,
    }
};

export const getQuarterAmount = (): number => config.quarter.amount;

export const getQuarterLength = (): number => config.quarter.length;