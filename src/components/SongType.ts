export interface SongType {
    id: string,
    name: string,
    artists: [string],
    duration: string,
    duration_seconds: number
    image: string,
    link: string,
    embed_url: string,
    start_time: string,
    time_remaining: number
}