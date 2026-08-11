import { client } from "../api/client";
import { GetMovieResponse } from "../types";

const MovieService = {
    getMovie: async (movieId: string): Promise<GetMovieResponse> => {
        return client.get<GetMovieResponse>(`/movies/${movieId}`, {
            auth: true,
        });
    },
};

export { MovieService };
