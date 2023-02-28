const display_contents = [{'text': '路線: ','id': 'road'},{'text': '方向: ','id': 'direction'},{'text': '区間: ','id': 'place'}]

let obj = document.createElement('div')

let obj_ul = document.createElement('ul')
obj_ul.setAttribute('style', 'margin:0; padding:2px 1em; display:flex; gap:1em; list-style:none; background-color: #eee; white-space:nowrap;')

obj.addEventListener(
    'contextmenu', 
    function( event ) {
        let el = document.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('table');
        if (el.length > 2) {
            if (el[0].getElementsByTagName('th')[0].textContent === '路線名称') {
                if (document.getElementsByTagName('iframe')[0].contentDocument.getElementsByClassName('overlay-event-popup')[0].getAttribute('style').slice(-14) !== 'display: none;') {
                    for (let i = 0; i < 3; i++) {
                        document.getElementById(display_contents[i].id).textContent = el[0].getElementsByTagName('td')[i].textContent.replace('付近','');
                    }
                    document.getElementById('msg').textContent = `${el[0].getElementsByTagName('th')[3].textContent}: ${el[0].getElementsByTagName('td')[3].textContent}`
                    document.getElementById('msg').setAttribute('style', 'color:black;')
                    return
                }
            }
        }
        document.getElementById('msg').textContent = '事象を選択してください'
        document.getElementById('msg').setAttribute('style', 'color:red;')
        for (let i = 0; i < 3; i++) {
            document.getElementById(display_contents[i].id).textContent = ''
        }
    })

for (let display_content of display_contents) {
    let obj_li = document.createElement('li')
    obj_li.textContent = display_content['text']
    let obj_span = document.createElement('span')
    obj_span.setAttribute('id', display_content['id'])
    obj_span.setAttribute('class', 'val')
    obj_span.setAttribute('style', 'text-decoration: underline; cursor: pointer;')
    obj_span.addEventListener(
        'click', 
        function( event ) {
            let data = document.getElementById(display_content['id']).textContent; 
            navigator.clipboard.writeText(data);
            document.getElementById('msg').textContent = `「${data}」をコピーしました`
            document.getElementById('msg').setAttribute('style', 'color:blue;')
        });
    obj_li.appendChild(obj_span)
    obj_ul.appendChild(obj_li)
}

let obj_msg = document.createElement('li')
obj_msg.setAttribute('id', 'msg')
obj_ul.appendChild(obj_msg)

obj.appendChild(obj_ul)

document.getElementsByTagName('body')[0].insertBefore(obj, document.getElementsByTagName('iframe')[0]);
