import {Redis} from "@upstash/redis";

const getUrl = () => {
    return process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL || ''
}

const getToken = () => {
    return process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN || ''
} 

export const db = new Redis({
    url: getUrl(),
    token: getToken()
})