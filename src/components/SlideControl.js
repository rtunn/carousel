/**
 * slideControl returns a previous or next button
 * @param {Object} props configuration properties
 * @param {string} btnType props.btnType - CSS class
 * @param {Function} onClick props.onClick - function called when onclick event is fired
 * @returns {Object} slideControl HTMLElement
 */
const slideControl = props => {
    let direction
    const validBtnTypes = ['prev', 'next']

    if ('btnType' in props === false) throw 'btnType is a required prop'
    if ('onClick' in props === false) throw 'onClick is a required prop'
    if (validBtnTypes.includes(props.btnType) === false) throw 'btnType must be "prev" or "next"'
    if (typeof props.onClick !== "function") throw 'onClick must be a function'
    
    if (props.btnType === 'prev') {
        direction = -1
    } else {
        direction = 1
    }
    
    const el = document.createElement('button')
    el.setAttribute('class', `SlideControl ${props.btnType}`)
    el.onclick = () => props.onClick(direction)
    el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \
        version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" \
        xml:space="preserve" width="512px" height="512px" class="carousel-chevron">
            <g><g> \
            <g> \
            <path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284    l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284    c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701    C391.333,275.032,391.333,236.967,367.954,213.588z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#000000"/> \
            </g> \
            </g></g>
        </svg>
    `
    return el
}

export default slideControl