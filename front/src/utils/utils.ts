export async function fetchData(link: string) {
    try {
        const res = await (await fetch(link)).json()
        if(!res) return
        return res
    } catch (err) {
        console.error(err)
        return
    }

}