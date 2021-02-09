import { animateFrame } from './animateFrame'
import * as recur from '../utility/recurTilTrue'

/**
 * executeAnimation moves on-screen slides into position
 * @param {Object} container HTMLElement parent node of slides
 * @param {Array.<Object>} slides array of Slide instances
 * @param {Number} duration number of milliseconds to complete animation
 * @returns {Array.<Promise>}
 */
export const executeAnimation = (slides, duration) => {
    // milliseconds delay to reach 60 FPS
    const msFps = 16.67
    const numFrames = Math.ceil(duration / msFps)
    const animationPromises = []

    for (let slide of slides) {
        const maxIncrement = slide.width / numFrames
        const animationPromise = recur.recurTilTrue(animateFrame(slide, maxIncrement), msFps)
        animationPromises.push(animationPromise)
    }
    return animationPromises
}