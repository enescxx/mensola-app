import { useState, useEffect, useCallback } from "react";
import { HomeService, HomeData } from "@/services/home.service";

interface UseHomeReturn {
    data: HomeData | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useHome = (): UseHomeReturn => {
    const [data, setData] = useState<HomeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await HomeService.getHomeData();
            if (response.success && response.data) {
                setData(response.data);
            } else {
                setError("Veriler yüklenirken bir sorun oluştu.");
            }
        } catch {
            setError("Sunucuya bağlanılamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
};
