/**
 * slideControl returns a previous or next button
 * @param {Object} props configuration properties
 * @param {string} btnType props.btnType - CSS class
 * @param {Function} onClick props.onClick - function called when onclick event is fired
 * @returns {Object} slideControl HTMLElement
 */
const slideControl = props => {
    let buttonIcon
    let direction
    const validBtnTypes = ['prev', 'next']

    if ('btnType' in props === false) throw 'btnType is a required prop'
    if ('onClick' in props === false) throw 'onClick is a required prop'
    if (validBtnTypes.includes(props.btnType) === false) throw 'btnType must be "prev" or "next"'
    if (typeof props.onClick !== "function") throw 'onClick must be a function'
    
    if (props.btnType === 'prev') {
        buttonIcon = '<'
        direction = -1
    } else {
        buttonIcon = '>'
        direction = 1
    }
    
    const el = document.createElement('button')
    el.setAttribute('class', `SlideControl ${props.btnType}`)
    el.onclick = () => props.onClick(direction)
    el.innerHTML = buttonIcon
    return el
}

export default slideControl