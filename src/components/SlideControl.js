/**
 * slideControl returns a previous or next button
 * @param {Object} props configuration properties
 * @param {string} btnType props.btnType - CSS class
 * @param {Function} onClick props.onClick - function called when onclick event is fired
 * @returns {Object} slideControl HTMLElement
 */
const slideControl = props => {
    let buttonIcon = '>'
    let direction = 1
    if (props.btnType === 'prev') {
        buttonIcon = '<'
        direction = -1
    }
    const el = document.createElement('button')
    el.setAttribute('class', `SlideControl ${props.btnType}`)
    el.onclick = () => props.onClick(direction)
    el.innerHTML = buttonIcon
    return el
}

export default slideControl