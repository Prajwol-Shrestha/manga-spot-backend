
export function getProxiedImageUrl(url: string) {
    const baseUrl = process.env.BASE_URL;
    const proxyUrl = `${baseUrl}/api/image-proxy?url=${url}`;
    return proxyUrl;
}