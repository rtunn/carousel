/**
 * loads lazy images
 * @param {Element} element document or HTMLElement
 * @return {Promise} promise resolves when all images are loaded
 */
const loadLazyImages = (element) => {
    const lazyImages = element.querySelectorAll('[loading="lazy"]')

    return new Promise(res => {
        const allPromises = []

        for (let i = 0; i < lazyImages.length; i++) {
            const lazyImage = lazyImages[i]
            const iPromise = new Promise((resolve) => {
                lazyImage.addEventListener('load', () => {
                    resolve()
                })
            allPromises.push(iPromise)
            })
            lazyImage.loading = "eager"
        }
        
        Promise.all(allPromises).then(_ => res())
    })
}