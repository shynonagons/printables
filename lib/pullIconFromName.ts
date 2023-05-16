const SEARCH_URL =  `https://safe.duckduckgo.com/?iax=images&ia=images&iaf=license%3AAny`;

export const pullIconFromName = async (name: string) => {
    const response = await fetch(`${SEARCH_URL}&q=${name}+icon`)
    return 'https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png' //response.text()
}