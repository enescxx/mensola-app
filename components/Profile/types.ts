import { StatType, StatTypeKey } from "@/types/stat.types";
import { UserStats } from "@/types/user.types";

export interface IHeaderStatsProps {
    stats: Partial<UserStats>;
    onStatPress?: (type: StatTypeKey) => void;
}

export interface IHeaderStatItemProps {
    statType: StatTypeKey;
    statValue: number;
    onPress?: (type: StatTypeKey) => void;
}

export interface IFooterItemProps {
    statType: StatTypeKey;
    statValue: number;
    onPress?: (type: StatTypeKey) => void;
}
