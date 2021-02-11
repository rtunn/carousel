import { initCarousels } from './utility/initCarousels'

export const main = () => document.addEventListener('DOMContentLoaded', () => {
    initCarousels(window.carouselDefaultProps)
})

main()