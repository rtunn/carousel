/**
 * pagination returns a pagination container with a button for each slide
 * @param {Object} props configuration properties
 * @param {Number} numSlides props.numSlides - Integer number of slides
 * @returns {Object} HTMLElement
 */
const pagination = props => {
    const buttons = []
    for (let i=0; i < props.numSlides; i++) {
        const button = '<button></button>'
        buttons.push(button)
    }
    return (`
        <div class="Pagination">
            ${buttons.join(' ')}
        </div>
    `)
}

export default pagination